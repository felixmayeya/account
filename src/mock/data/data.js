import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '马天骁'
  }
];
const Client = [];

for (let i = 0; i < 86; i++) {
  Client.push(Mock.mock({
    id: Mock.Random.increment(),
    no: Mock.Random.id(),
    'type|1': ["试用", "付费"],
    company : Mock.mock('@ctitle(3, 7)'),
    account_email : Mock.mock('@email()'),
    leader: Mock.Random.cname(),
    'leader_phone': /^1[0-9]{10}$/,
    leader_department :　Mock.mock('@cword(3, 5)'),
    province: Mock.mock('@province()'),
    city: Mock.mock('@city()'),
    area: Mock.mock('@county()'),
    address: Mock.mock('@county(true)'),
    create_time: Mock.Random.date()
  }));
}


export { LoginUsers,Client};
