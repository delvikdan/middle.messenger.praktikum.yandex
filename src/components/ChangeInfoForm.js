export default `
  <form class="info" action="#">
    <div class="info__container">
      {{#with userData}}
        <div class="info__row">
          <label for="email" class="info__key">Почта</label>
          <input id="email" name="email" type="email" class="info__value" value="{{email}}" />
        </div>
        <div class="info__row">
          <label for="login" class="info__key">Логин</label>
          <input id="login" name="login" type="text" class="info__value" value="{{login}}" />
        </div>
        <div class="info__row">
          <label for="first_name" class="info__key">Имя</label>
          <input id="first_name" name="first_name" type="text" class="info__value" value="{{firstName}}" />
        </div>
        <div class="info__row">
          <label for="second_name" class="info__key">Фамилия</label>
          <input id="second_name" name="second_name" type="text" class="info__value" value="{{secondName}}" />
        </div>
        <div class="info__row">
          <label for="phone" class="info__key">Телефон</label>
          <input id="phone" name="phone" class="info__value" type="tel" value="{{phone}}" />
        </div>
      {{/with}}
    </div>
    <div class="info__submit">
      <button type="button" class="btn btn-text">Сохранить</button>
    </div>
  </form>
`;
