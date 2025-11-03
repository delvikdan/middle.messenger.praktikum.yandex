import { API_URL } from "../api/config.ts";
import Block from "../framework/Block.ts";

export type AvatarProps = {
  avatar: string;
  altText: string;
  className?: string;
};

export class Avatar extends Block {
  override render(): string {
    return `
      <img class="avatar" 
        {{#if avatar}}
          src="${API_URL}/resources{{avatar}}" 
          alt="{{altText}}"
        {{else}}
          src="/images/image-placeholder.png" 
          alt="avatar"
        {{/if}}
      >`;
  }
}
