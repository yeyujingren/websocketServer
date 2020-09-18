import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.all('/user/login', controller.user.login);
  router.all('/user/email/code', controller.user.emailCode);
  router.all('/user/register', controller.user.register);
  // router.post('/register', controller.user.register);
  router.all('/**', controller.home.index);
};
