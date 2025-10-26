import Block from "@/framework/Block";

export type ProfileInfoProps = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
};

export class ProfileInfo extends Block {
  override render(): string {
    return `
      <dl class="profile-info">
        <div class="profile-info__line">
          <dt class="profile-info__key">Почта</dt>
          <dd class="profile-info__value">{{email}}</dd>
        </div>
        <div class="profile-info__line">
          <dt class="profile-info__key">Логин</dt>
          <dd class="profile-info__value">{{login}}</dd>
        </div>
        <div class="profile-info__line">
          <dt class="profile-info__key">Имя</dt>
          <dd class="profile-info__value">{{firstName}}</dd>
        </div>
        <div class="profile-info__line">
          <dt class="profile-info__key">Фамилия</dt>
          <dd class="profile-info__value">{{secondName}}</dd>
        </div>
        <div class="profile-info__line">
          <dt class="profile-info__key">Телефон</dt>
          <dd class="profile-info__value">{{phone}}</dd>
        </div>
      </dl>`;
  }
}
