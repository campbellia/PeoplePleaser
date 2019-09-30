var db = require('./index.js');

module.exports = {
  createPoll: (data, callback) => {
    db.collection("polls").add({
      linkId: data.linkId,
      pollName: data.pollName,
      pollOptions: data.options,
      totalVotes: 0
  })
  .then(function(record) {
      callback(record);
  })
  .catch(function(error) {
      callback(error);
  });
  },
  getPoll: (linkId) =>{
    console.log('GET POLL WITH:', linkId);
  },
  updatePoll: (data) => {
    console.log("UPDATE POLL WITH:", data);
  },
  deletePoll: (linkId) => {
    console.log("DELETE POLL WITH:", id);
  }
}