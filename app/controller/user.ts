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
    const data: { email: string } = method.toUpperCase() === 'POST' ? request.body : query;
    console.log('data ----->', data);
    const context = {
      code: 2,
      msg: '请输入正确的邮箱地址！',
      content: null,
      status: 'FAIL',
    };
    if (!isEmail(data.email)) {
      this.ctx.body = context;
      return;
    }
    // 验证邮箱是否已经被注册
    let result = await this.ctx.service.user.checkEmail(data.email);
    if (result) {
      this.ctx.body = {
        ...context,
        msg: '邮箱已经被注册！',
      };
      return;
    }

    // 获取邮箱验证码
    result = await this.ctx.service.user.emailCode(data.email);
    if (result) {
      this.ctx.body = {
        ...context,
        code: 1,
        msg: '发送成功！',
        status: 'success',
      };
      return;
    }
    this.ctx.body = {
      ...context,
      msg: '发送失败，请稍后重试！',
    };
    return;
  }

  /**
   * register
   * 用户注册
   */
  public async register() {
    const { ctx } = this;
    const { method, query, request } = ctx;
    const { isEmail, hasEmpty, hasUndef, isFormatPwd } = ctx.helper;
    const data: APIParams.Register = method.toUpperCase() === 'POST' ? request.body : query;
    const context = {
      code: 2,
      msg: '请填写完整的注册信息',
      content: null,
      status: 'FAIL',
    };

    console.log('register payload ----->', data, ctx.cookies.get(`${data.email}_verify_code`));

    if (hasEmpty(data) || hasUndef(data)) {
      ctx.body = {
        ...context,
      };
      return;
    }

    if (!isEmail(data.email) || !isFormatPwd(data.userpwd)) {
      ctx.body = {
        ...context,
        msg: '请填写正确的格式！',
      };
      return;
    }
    if (data.verifyCode !== ctx.cookies.get(`${data.email}_verify_code`, { signed: false })) {
      ctx.body = {
        ...context,
        msg: '验证码错误！',
      };
      return;
    }

    const result = await ctx.service.user.register(data);
    if (result) {
      ctx.body = {
        ...context,
        msg: '注册成功',
        code: 1,
        status: 'SUCCESS',
      };
      return;
    }
    ctx.body = {
      ...context,
      msg: '注册失败，请稍后重试',
    };
  }
}
