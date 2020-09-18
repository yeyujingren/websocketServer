import { Service } from 'egg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');


export default class userService extends Service {
  /**
   * login
   */
  public async login(data: {username: string, userpwd:string}) {
    const { isEmpty } = this.ctx.helper;
    const { username, userpwd } = data;
    if (isEmpty(username) || isEmpty(userpwd)) return;
    const result = await this.app.mysql.get('user', { u_name: username });
    console.log('compare', await this.ctx.compare(userpwd, result[0] && result[0].u_pwd || ''), username, userpwd);
    return await this.ctx.compare(userpwd, result[0] && result[0].u_pwd || '');
  }

  /**
   * checkEmail
   * 验证邮箱是否已经注册
   */
  public async checkEmail(data: string) {
    try {
      const result = await this.app.mysql.select('user', { u_email: data });
      if (result.length !== 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * send email
   */
  public async emailCode(data: string) {
    const { emailConfig } = this.app.config;
    const transporter = nodemailer.createTransport(emailConfig);
    // 生成六位随机数字并存入session中有效期为10min
    const verifyCode = String(Math.floor(Math.random() * 900000) + 100000);
    this.ctx.cookies.set(
      `${data}_verify_code`,
      verifyCode,
      {
        maxAge: 10 * 60 * 1000,
      },
    );

    console.log('verifyCode', this.ctx.cookies.get(`${data}_verify_code`));

    const mailOptions = {
      from: emailConfig.auth.user, // 发送者,与上面的user一致
      to: data, // 接收者,可以同时发送多个,以逗号隔开
      subject: '验证你的邮箱地址', // 标题
      // text: '测试内容', // 文本
      html: `<h2 style="text-align: center;">验证您的电子邮箱地址</h2>
      <p style="text-align: left;">
          感谢您选择使用本产品，希望能一起度过美好的时间。请输入一下验证码，来验证您的邮箱：
      </p>
      <b style="font-size: 24px;">${verifyCode}</b>
      <p>验证码有效期为10分钟，请及时注册</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.log('send email error =====>', error);
      return false;
    }
  }

  /**
   * register
   * 用户注册
   */
  public async register(data: APIParams.Register) {
    const { ctx } = this;
    const { userpwd, username, email } = data;
    const hashPwd = await ctx.genHash(userpwd);
    try {
      await this.app.mysql.insert('user', {
        u_name: username,
        u_pwd: hashPwd,
        u_createTime: ctx.helper.formateDate('yyyy-MM-dd'),
        u_email: email,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
