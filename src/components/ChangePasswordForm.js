export default `
  <form class="info" action="#">
    <div class="info__container">
      {{#with userData}}
        <div class="info__row">
          <label for="old-password" class="info__key">Старый пароль</label>
          <input id="old-password" name="oldPassword" type="password" class="info__value" value="{{oldPassword}}" />
        </div>
        <div class="info__row">
          <label for="new-password" class="info__key">Новый пароль</label>
          <input id="new-password" name="newPassword" type="password" class="info__value" value="{{newPassword}}" />
        </div>
        <div class="info__row">
          <label for="repeat-password" class="info__key">Повторите новый пароль</label>
          <input id="repeat-password" name="repeatPassword" type="password" class="info__value" value="{{newPassword}}" />
        </div>
      {{/with}}
    </div>
    <div class="info__submit">
      <button type="button" class="btn btn-text">Сохранить</button>
    </div>
  </form>
`;
