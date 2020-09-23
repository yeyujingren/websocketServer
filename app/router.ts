import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, io } = app;

  // socket.io
  io.of('/chat').route('/', io.controller.index.index);

  router.all('/user/login', controller.user.login);
  router.all('/user/email/code', controller.user.emailCode);
  router.all('/user/register', controller.user.register);
  // router.post('/register', controller.user.register);
  router.all('/**', controller.home.index);
};
