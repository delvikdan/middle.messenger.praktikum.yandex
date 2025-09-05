export default `
  <div class="form__group">
    <input id="{{nameAttr}}" class="form__input" type="{{type}}" name="{{nameAttr}}" value="{{value}}" placeholder=" ">
    <label for="{{nameAttr}}" class="form__label">{{label}}</label>
    {{#if error}}
      <p class="form__error">{{error}}</p>
    {{/if}}
  </div>
`;
