const _bcrypt = require("bcrypt");

const hash = async (data, rounds = 10, callback) => {
  if (typeof rounds == "function") {
    callback = rounds;
    rounds = 10;
  }
  return _bcrypt.hash(data, rounds, callback);
};

const hashSync = (data, rounds = 10) => {
  return _bcrypt.hashSync(data, rounds);
};

module.exports = {
  hash,
  hashSync,
  compare: _bcrypt.compare,
  compareSync: _bcrypt.compareSync,
  getRounds: _bcrypt.getRounds,
};
