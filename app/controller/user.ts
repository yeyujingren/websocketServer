import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * login
   * 用户登陆
   */
  public async login() {
    const { method, query, request } = this.ctx;
    const data = method.toUpperCase() === 'POST' ? request.body : query;
    console.log('request method ======>', method);
    console.log('request body =======>', data);
    const result = await this.ctx.service.user.login(data);
    this.ctx.body = {
      code: result ? 1 : 2,
      msg: result ? '登陆成功' : '账号或密码错误！',
      content: null,
      status: result ? 'SUCCESS' : 'FAIL',
    };
  }
}
