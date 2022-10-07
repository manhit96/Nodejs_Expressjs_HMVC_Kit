const path = require('path');
const fs = require('fs');

module.exports = () => {
  const reloadConfig = fs.readFileSync(path.join(__dirname, 'config.json'), {encoding: 'utf8'});
  return JSON.parse(reloadConfig)[process.env.NODE_ENV];
};