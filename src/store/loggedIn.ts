export class LoggedInStore {
  private static _isLoggedIn = false;

  static get isLoggedIn() {
    return this._isLoggedIn;
  }

  static setLoggedIn(loggedIn: boolean) {
    this._isLoggedIn = loggedIn;
  }
}
