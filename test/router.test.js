import { expect } from 'chai';
import sinon from 'sinon';

// Import TS modules via ESM with our alias loader + ts-node/esm
const { Router } = await import('../src/router/Router.ts');
const { default: store } = await import('../src/store/store.ts');

// Minimal Block-like class to satisfy Router's expectations at runtime
class FakeBlock {
  constructor(text) {
    this._el = document.createElement('div');
    this._el.id = 'view';
    this._el.textContent = text;
  }
  getContent() {
    return this._el;
  }
  hide() {
    this._el.style.display = 'none';
  }
}

class SignInPage extends FakeBlock { constructor() { super('SignIn'); } }
class SignUpPage extends FakeBlock { constructor() { super('SignUp'); } }
class MessengerPage extends FakeBlock { constructor() { super('Messenger'); } }
class SettingsPage extends FakeBlock { constructor() { super('Settings'); } }
class NotFoundPage extends FakeBlock { constructor() { super('NotFound'); } }

describe('Router (JS ESM)', () => {
  let router;
  let pushSpy;

  before(() => {
    const root = document.createElement('div');
    root.id = 'app';
    document.body.appendChild(root);

    router = new Router('#app');
    router
      .use('/', SignInPage)
      .use('/sign-up', SignUpPage)
      .use('/messenger', MessengerPage)
      .use('/settings', SettingsPage)
      .use('/404', NotFoundPage);
    router.start();
  });

  beforeEach(() => {
    store.reset();
    document.querySelector('#app').innerHTML = '';
    pushSpy = sinon.spy(window.history, 'pushState');
  });

  afterEach(() => {
    pushSpy.restore();
  });

  const viewText = () => document.querySelector('#view')?.textContent || '';

  it('redirects guest from protected routes to "/"', () => {
    router.go('/settings');
    expect(viewText()).to.equal('SignIn');
    expect(pushSpy.callCount).to.be.greaterThanOrEqual(2);
    expect(window.location.pathname).to.equal('/');
  });

  it('redirects authenticated user from "/" to "/messenger"', () => {
    store.set('user', { id: 1 });
    router.go('/');
    expect(viewText()).to.equal('Messenger');
    expect(window.location.pathname).to.equal('/messenger');
  });

  it('redirects authenticated user from "/sign-up" to "/messenger"', () => {
    store.set('user', { id: 1 });
    router.go('/sign-up');
    expect(viewText()).to.equal('Messenger');
    expect(window.location.pathname).to.equal('/messenger');
  });

  it('navigates to not found ("/404") for unknown routes', () => {
    router.go('/unknown');
    expect(viewText()).to.equal('NotFound');
    expect(window.location.pathname).to.equal('/404');
  });

  it('getRoute returns a registered route', () => {
    const route = router.getRoute('/messenger');
    expect(route).to.exist;
  });

  it('handles anchor clicks with data-router-link', () => {
    store.set('user', { id: 1 });
    const link = document.createElement('a');
    link.setAttribute('href', '/messenger');
    link.setAttribute('data-router-link', '');
    link.textContent = 'Go';
    document.body.appendChild(link);

    const clickEvent = new window.MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(clickEvent);

    expect(viewText()).to.equal('Messenger');
    expect(window.location.pathname).to.equal('/messenger');
  });

  it('calls history.back and history.forward', () => {
    const backStub = sinon.stub(window.history, 'back');
    const forwardStub = sinon.stub(window.history, 'forward');

    router.back();
    router.forward();

    expect(backStub.calledOnce).to.be.true;
    expect(forwardStub.calledOnce).to.be.true;

    backStub.restore();
    forwardStub.restore();
  });
});
