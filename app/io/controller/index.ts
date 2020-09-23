import { Controller } from 'egg';

export default class Index extends Controller {
  /**
   * ping
   * test for websocket
   */
  public async ping() {
    const { ctx } = this;
    const message: string = ctx.args[0];
    await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
  }
}
