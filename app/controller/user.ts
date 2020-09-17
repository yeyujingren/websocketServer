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
  /**
   * emailCode
   * kasfkupopwbbdefh
   * 发送邮箱验证码
   */
  public async emailCode() {
    const { method, query, request } = this.ctx;
    const { isEmail } = this.ctx.helper;
    const data: {email: string} = method.toUpperCase() === 'POST' ? request.body : query;
    console.log('data ----->', data);
    if (!isEmail(data.email)) {
      this.ctx.body = {
        code: 2,
        msg: '请输入正确的邮箱地址！',
        content: null,
        status: 'FAIL',
      };
      return;
    }
    const result: boolean = await this.ctx.service.user.emailCode(data.email);
    if (result) {
      this.ctx.body = {
        code: 1,
        msg: '发送成功！',
        content: null,
        status: 'success',
      };
      return;
    }
    this.ctx.body = {
      code: 2,
      msg: '发送失败，请稍后重试！',
      content: null,
      status: 'FAIL',
    };
    return;
  }
}
