import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
};

export default plugin;
