const FtpDeploy = require('ftp-deploy');

const ftpDeploy = new FtpDeploy();

const config = {
  user: 'user',
  password: 'password',
  host: 'host',
  port: 21,
  localRoot: `${__dirname}/dist`,
  remoteRoot: '/students-control-panel/public_html/',
  include: ['**.*'],
  exclude: ['dist/**/*.map', 'node_modules/**', '.git/**'],
  deleteRemote: true,
  forcePasv: true,
  sftp: false,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log('finished:', res))
  .catch((err) => console.log(err));
