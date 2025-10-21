import Block from "@/framework/Block";
import ChatController from "@/controllers/ChatController";
import isEqual from "@/helpers/isEqual";
import { connect } from "@/hoc/connect";
import { ChatUserType } from "@/types/user";
import { ChatType } from "@/types/chat";

import { AvatarUploader } from "@/components/AvatarUploader";
import { Title } from "@/components/Title";
import { Link } from "@/components/Link";
import { Input } from "@/components//Input";
import { ChatUserList } from "@/components/Chat/ChatUserList";

type ChatOptionsProps = {
  chatId: number;
  avatar: string;
  title: string;
  currentChatUsers: ChatUserType[];
  onClose?: () => void;
  currentUserId: number;
  isCurrentUserAdmin: boolean;
  [key: string]: unknown;
};

export class ChatOptions extends Block<ChatOptionsProps> {
  constructor(props: ChatOptionsProps) {
    const {
      currentChatUsers,
      chatId,
      avatar,
      title,
      currentUserId,
      isCurrentUserAdmin,
    } = props;

    const chatAvatarUploader = new AvatarUploader({
      avatar,
      altText: title,
      onUpload: (formData) => {
        formData.append("chatId", String(chatId));
        return ChatController.changeAvatar(formData);
      },
    });

    const chatTitle = new Title({
      className: "chat-options__title",
      title,
    });

    const userListTitle = new Title({
      className: "chat-options__users-title",
      title: "Участники",
    });

    const userList = new ChatUserList({
      users: currentChatUsers,
      chatId,
      currentUserId,
      isCurrentUserAdmin,
    });

    const deleteCurrentChat = new Link({
      href: "#",
      text: "Удалить чат",
      className: "link link--red",
      onClick: (e: Event) => this.onDeleteChat(e),
    });

    const closeOptions = new Link({
      href: "#",
      text: "Закрыть",
      className: "link",
      onClick: (e: Event) => this.onCloseOptions(e),
    });

    const addUserInput: Input = new Input({
      id: `add-user-${chatId}`,
      typeAttr: "text",
      nameAttr: "add-user-${chatId}",
      className: "chat-options__add-user-input",
      placeholder: "Введите логин",
    });

    const addUserAction = new Link({
      href: "#",
      text: "Добавить участника",
      className: "link",
      onClick: (e: Event) => {
        e.preventDefault();
        const userLogin = addUserInput.getValue?.() ?? "";
        if (!userLogin.trim()) {
          alert("Введите логин");
          return;
        }
        ChatController.addUserByLogin(userLogin)
          .then(() => {
            addUserInput.setProps({ value: "" });
          })
          .catch((error) => {
            addUserInput.setProps({ value: "" });
            const errorMessage =
              error?.reason ||
              error?.message ||
              "Произошла ошибка при добавлении участника";
            alert(errorMessage);
            console.error("Add user error:", error);
          });
      },
    });

    super({
      ...props,
      chatAvatarUploader,
      chatTitle,
      userListTitle,
      deleteCurrentChat,
      closeOptions,
      addUserInput,
      addUserAction,
      userList,
    });
  }

  private onDeleteChat(e: Event) {
    e.preventDefault();
    const chatId = this.props.chatId;
    if (chatId) {
      ChatController.deleteChat(chatId).catch(console.error);
    }
  }

  private onCloseOptions(e: Event) {
    e.preventDefault();
    this.props.onClose?.();
  }

  override componentDidUpdate(
    oldProps: ChatOptionsProps,
    newProps: ChatOptionsProps
  ): boolean {
    if (
      oldProps.avatar !== newProps.avatar ||
      oldProps.title !== newProps.title
    ) {
      this.children.chatAvatarUploader.setProps({
        avatar: newProps.avatar,
        altText: newProps.title,
        onUpload: (formData: FormData) => {
          formData.append("chatId", String(newProps.chatId));
          return ChatController.changeAvatar(formData);
        },
      });
    }

    if (oldProps.title !== newProps.title) {
      this.children.chatTitle.setProps({
        title: newProps.title,
      });
    }

    if (oldProps.chatId !== newProps.chatId) {
      this.children.deleteCurrentChat.setProps({
        onClick: (e: Event) => this.onDeleteChat(e),
      });
    }

    if (
      !isEqual(oldProps.currentChatUsers, newProps.currentChatUsers) ||
      oldProps.chatId !== newProps.chatId
    ) {
      this.children.userList = new ChatUserList({
        users: newProps.currentChatUsers,
        chatId: newProps.chatId,
        currentUserId: newProps.currentUserId,
        isCurrentUserAdmin: newProps.isCurrentUserAdmin,
      });
    }

    return true;
  }

  override render(): string {
    return `
      <div class="chat-options">
     
        {{{chatTitle}}}
        {{{chatAvatarUploader}}}
  
        {{{userListTitle}}}

        {{{userList}}}

        {{#if isCurrentUserAdmin}}
          <div class="chat-options__add-user">
            {{{addUserInput}}}
            <div class="chat-options__add-user-action">{{{addUserAction}}}</div>
          </div>
        {{/if}}

        <ul class="chat-options__actions actions">
          {{#if isCurrentUserAdmin}}
          <li class="actions__item">{{{deleteCurrentChat}}}</li>
          {{/if}}
          <li class="actions__item">{{{closeOptions}}}</li>
        </ul>
        
      </div>`;
  }
}

export default connect(ChatOptions, (state) => {
  const currentUserId = state.user?.id;

  const activeChatId = state.activeChat;
  const chats: ChatType[] = state.chats || [];
  const chatData =
    activeChatId != null
      ? chats.find((chat) => chat.id === activeChatId)
      : undefined;
  const currentChatUsers =
    activeChatId && state.chatUsers?.[activeChatId]
      ? state.chatUsers[activeChatId]
      : [];

  const isCurrentUserAdmin = chatData?.created_by === currentUserId;
  return {
    chatId: activeChatId,
    avatar: chatData?.avatar,
    title: chatData?.title,
    currentChatUsers,
    isCurrentUserAdmin,
    currentUserId,
  };
});
