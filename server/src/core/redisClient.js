const redis = require("redis");

module.exports = getConnection;

function getConnection() {
  return new Promise((resolve, reject) => {
    let client = redis.createClient();
    client.on("connect", err => {
      if (err) reject(err);
      else resolve(new RedisClient(client));
    });
  });
}

class RedisClient {
  constructor(client) {
    this.client = client;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  set(key, what) {
    return new Promise((resolve, reject) => {
      this.client.set(key, what, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  lpush(key, what) {
    return new Promise((resolve, reject) => {
      this.client.lpush(key, what, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  lrange(key, s, e) {
    return new Promise((resolve, reject) => {
      this.client.lrange(key, s, e, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
