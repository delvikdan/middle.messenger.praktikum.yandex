export const mockChatListItems = [
  {
    avatar: "",
    displayName: "Андрей",
    latestMessage: "Изображение",
    latestMessageDate: "10:49",
    unreadCount: "2",
  },
  {
    avatar: "",
    displayName: "Киноклуб",
    latestMessage: "<span>Вы:</span> стикер",
    latestMessageDate: "12:00",
    unreadCount: "",
  },
  {
    avatar: "",
    displayName: "Илья",
    latestMessage: "Друзья, у меня для вас особенный выпуск новостей!",
    latestMessageDate: "15:12",
    unreadCount: "4",
  },
  {
    avatar: "/images/commander.png",
    displayName: "Вадим",
    latestMessage: "<span>Вы:</span> Круто!",
    latestMessageDate: "Пт",
    unreadCount: "",
    selected: true,
  },
  {
    avatar: "",
    displayName: "тет-а-теты",
    latestMessage: "И Human Interface Guidelines и Material Design рекомендуют",
    latestMessageDate: "Ср",
    unreadCount: "",
  },
];

export const mockChatSelected = {
  displayName: "Вадим",
  avatar: "/images/commander.png",
  period: "19 июня",
  messages: [
    {
      author: "Вадим",
      type: "text",
      content:
        "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
      time: "11:56",
    },
    {
      author: "Вадим",
      type: "image",
      content: "/images/example.png",
      time: "11:56",
    },
    {
      author: "",
      type: "text",
      content: "Круто!",
      time: "12:00",
      status: "read",
    },
  ],
};

export const mockUserData = {
  avatar: "",
  email: "pochta@yandex.ru",
  login: "ivanivanov",
  firstName: "Иван",
  secondName: "Иванов",
  displayName: "Иван",
  phone: "+7 (909) 967 30 30",
  password: "password",
  oldPassword: "oldPassword",
  newPassword: "newPassword123",
};
