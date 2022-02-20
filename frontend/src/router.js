import service from "./service.js";

const routes = ['rank', 'profile', 'rules', 'auth'];

const appRender = {
  rank: `<app-rank></app-rank>`,
  rules: `<app-rules></app-rules>`,
  profile: `<app-profile></app-profile>`,
  auth: `<app-auth></app-auth>`,
  '/': `<app-word></app-word>`
};

const serializePath = (path) => routes.find(r => path.includes(r)) || '/';

const guardAction = (path, mustBeLoggedIn, authUser, redirectTo = '/') => {
  const serializedPath = serializePath(path);
  if (mustBeLoggedIn === undefined) {
    return serializedPath
  }
  if (!mustBeLoggedIn && authUser) {
    return redirectTo
  }
  if (mustBeLoggedIn && !authUser) {
    return redirectTo
  }
  return serializedPath;
};

const guardRoutes = {
  rank: (path, authUser) => guardAction(path, true, authUser, 'auth'),
  rules: (path, authUser) => guardAction(path, undefined, authUser),
  profile: (path, authUser) => guardAction(path, true, authUser, 'auth'),
  auth: (path, authUser) => guardAction(path, false, authUser, 'rules'),
  '/': (path, authUser) => guardAction(path, true, authUser, 'auth?action=login')
};

class AppRouter {
    _currentPath = '/';
    navigateTo = async (to) => {
        if (to === location.pathname) {
            return
        }
        const serializedPath = serializePath(to);
        if (service.authUser.value === undefined) {
            await service.authenticate();
        }
        this.currentPath = guardRoutes[serializedPath]
            ? guardRoutes[serializedPath](to, service.authUser.value)
            : serializedPath;
        if (this.currentPath.includes('auth')) {
            const mode = to.includes('register') || this.currentPath.includes('register')
                ? 'register'
                : 'login';
            appRender.auth = `<app-auth mode=${mode}></app-auth>`;
            this.currentPath = serializePath(this.currentPath);
        }
        document.getElementById('router-outlet').innerHTML = appRender[this.currentPath];
        history.pushState(null, null, to);
    };

    get currentPath() {
        return this._currentPath;
    }

    set currentPath(val) {
        this._currentPath = val;
    }
}

export const appRouter = new AppRouter();
