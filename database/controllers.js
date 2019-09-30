var db = require('./index.js');

module.exports = {
  createPoll: (data, callback) => {
    db.collection("polls").add({
      name: data.name,
      options: data.options,
      totalVotes: 0
    })
    .then(function(record) {
        callback(null, record.id);
    })
    .catch(function(error) {
        callback(error);
    });
  },
  getPoll: (id, callback) => {
    var docRef = db.collection("polls").doc(id);
    docRef.get()
    .then((doc) => {
      if(doc.exists) {
        callback(null, doc.data());
      } else {
        callback('Document does not exist');
      }
    })
    .catch(function(error) {
      callback(error);
    });
  },
  updatePoll: (id, poll, callback) => {
    var docRef = db.collection("polls").doc(id);
    docRef.update({options: poll.options, totalVotes: poll.totalVotes})
    .then(doc => {
      callback(null, doc);
    })
    .catch(function(error) {
      callback(error);
    });
  },
  deletePoll: (linkId) => {
    console.log("DELETE POLL WITH:", id);
  }
}