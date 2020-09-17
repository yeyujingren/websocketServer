import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.all('/login', controller.user.login);
  router.all('/email/code', controller.user.emailCode);
  // router.post('/register', controller.user.register);
  router.all('/**', controller.home.index);
};
