export default `
  <dl class="info">
    {{#with userData}}
      <div class="info__row">
        <dt class="info__key">Почта</dt>
        <dd class="info__value">{{email}}</dd>
      </div>
      <div class="info__row">
        <dt class="info__key">Логин</dt>
        <dd class="info__value">{{login}}</dd>
      </div>
      <div class="info__row">
        <dt class="info__key">Имя</dt>
        <dd class="info__value">{{firstName}}</dd>
      </div>
      <div class="info__row">
        <dt class="info__key">Фамилия</dt>
        <dd class="info__value">{{secondName}}</dd>
      </div>
      <div class="info__row">
        <dt class="info__key">Телефон</dt>
        <dd class="info__value">{{phone}}</dd>
      </div>
    {{/with}}
  </dl>
`;
