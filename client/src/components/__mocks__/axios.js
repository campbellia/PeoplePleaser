const axios = jest.genMockFromModule('axios');

const get = jest.fn((url) => {
  var sampleResponse1 = {
    data: {
      name: "Roots",
      options: {
        "Licorice": [3, 5],
        "Potato": [1, -3]
      },
      totalVotes: 2,
      terminated: false
    }
  };

  var sampleResponse2 = {
    data: {
      name: "Bears?",
      options: {
        "Brownbear": [1, 5, 3],
        "Blackbear": [0, 5, -5]
      },
      totalVotes: 3,
      terminated: true
    }
  };

  return new Promise((resolve, reject) => {
    if (url === '/polls/123') {
      var res = sampleResponse1;
    } else {
      var res = sampleResponse2;
    }
    resolve(res);
  });
});

const put = jest.fn((url, data) => {
  return new Promise((resolve, reject) => {
    const res = {};
    resolve(res);
  });
});

const post = jest.fn((url, data) => {
  return new Promise((resolve, reject) => {
    var res = {
      data: '/polls/123/vote'
    }
    resolve(res);
  });
});

axios.get = get;
axios.put = put;
axios.post = post;

module.exports = axios;