const axios = jest.genMockFromModule('axios');

const get = (url) => {
  return new Promise((resolve, reject) => {
    var data = {
      name: "test",
      options: {"option1": [3]},
      totalVotes: 0,
      terminated: false
    }
    resolve(data);
  });
}

const put = (url, data) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

const post = (url, data) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

axios.get = get;
axios.put = put;
axios.post = post;

module.exports = axios;