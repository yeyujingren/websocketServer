import { Service } from 'egg';


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
}
