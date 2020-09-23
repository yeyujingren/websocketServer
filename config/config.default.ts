import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 数据相关配置
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'Root@123',
      database: 'chat_source',
    },
    app: true,
    agent: false,
  };

  // 邮箱基础配置
  config.emailConfig = {
    service: 'qq', // 发送方的邮箱服务器
    secureConnection: true, // 启动SSL
    port: 465, // 端口就是465（默认）
    auth: {
      user: '2776107754@qq.com', // 账号
      pass: 'kasfkupopwbbdefh', // 授权码,
    },
  };

  // bcrypt加密相关配置
  config.bcrypt = {
    saltRounds: 10,
  };

  // websocket 配置
  config.io = {
    init: { wsEngine: 'ws' }, // default ws, it also have uws engine
    namespace: {
      '/chat': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599723249141_1008';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
