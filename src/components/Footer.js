export default `
  <footer class="footer">
    <ul>
    <li>{{> Link href="#" class="link footer-link active" data-page="signIn" text="Вход"}}</li>
    <li>{{> Link href="#" class="link footer-link" data-page="signUp" text="Регистрация"}}</li>
    <li>{{> Link href="#" class="link footer-link" data-page="chat" text="Список чатов"}}</li>
    <li>{{> Link href="#" class="link footer-link" data-page="profile" text="Профиль"}}</li>
    <li>{{> Link href="#" class="link footer-link" data-page="page404" text="404"}}</li>
    <li>{{> Link href="#" class="link footer-link" data-page="page500" text="500"}}</li>
    </ul>
  </footer>
`;
