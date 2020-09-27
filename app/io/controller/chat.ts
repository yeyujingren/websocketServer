import { Controller } from 'egg';

export default class ChatController extends Controller {
  /**
   * ping
   * test for websocket
   */
  public async ping() {
    const { ctx, app } = this;
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { target } = message;
      console.log('1111111', message, client);
      if (!target) return;
      socket.emit('news', { data: [{ id: 1, text: '我是向前端发送的新闻列表' }] });
      // const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
      // nsp.emit(target, msg);
    } catch (error) {
      app.logger.error(error);
    }
  }
}
