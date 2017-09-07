import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Client,LoginUsers } from './data/data';

let client = Client;

export default {
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock.onGet('/open00/customer.open').reply(config => {
    //   return new Promise((resolve, reject) => {
    //     resolve([200, {
    //       client: client
    //     }]);
    //   });
    // })

    //登录
    // mock.onPost('/login').reply(config => {
    //   let {
    //     username,
    //     password
    //   } = JSON.parse(config.data);
    //   return new Promise((resolve, reject) => {
    //     let user = null;
    //     setTimeout(() => {
    //       let hasUser = LoginUsers.some(u => {
    //         if (u.username === username && u.password === password) {
    //           user = JSON.parse(JSON.stringify(u));
    //           user.password = undefined;
    //           return true;
    //         }
    //       });
		//
    //       if (hasUser) {
    //         resolve([200, {
    //           code: 200,
    //           msg: '请求成功',
    //           user
    //         }]);
    //       } else {
    //         resolve([200, {
    //           code: 500,
    //           msg: '账号或密码错误'
    //         }]);
    //       }
    //     }, 1000);
    //   });
    // });
  }
}
