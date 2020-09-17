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
    const result = await this.app.mysql.select('user', { u_name: username });
    return await this.ctx.compare(userpwd, result[0] && result[0].u_pwd || '');
  }

  /**
   * send email
   */
  public async emailCode(data: string) {
    console.log(data, this.app.config.email);
    const { email } = this.app.config;
    const transporter = nodemailer.createTransport(email);
    const mailOptions = {
      from: '2776107754@qq.com', // 发送者,与上面的user一致
      to: '18705607268@163.com', // 接收者,可以同时发送多个,以逗号隔开
      subject: '验证你的邮箱地址', // 标题
      // text: '测试内容', // 文本
      html: `<h2 style="text-align: center;">验证您的电子邮箱地址</h2>
      <p style="text-align: left;">
          感谢您选择使用本产品，希望能一起度过美好的时间。请输入一下验证码，来验证您的邮箱：
      </p>
      <b style="font-size: 24px;">1234565</b>`,
    };

    await transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info);
    });
  }
}
