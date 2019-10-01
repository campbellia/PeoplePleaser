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
    return db.runTransaction(transaction => {
      return transaction.get(docRef).then(doc => {
        if (!doc.exists) {
          console.log('Poll does not exist');
        } else {
          var newOptions = {};
          var data = doc.data();
          for (let option in data.options) {
            newOptions[option] = data.options[option].concat(poll.options[option]);
          }
          var totalVotes = data.totalVotes + 1;
          transaction.update(docRef, {options: newOptions, totalVotes: totalVotes, terminated: poll.terminated});
        }
      }).then(() => {
        console.log("Success!");
        callback(null);
      }).catch(error => {
        console.log(error);
        callback(error);
      });
    });
  },
  terminatePoll: (id, callback) => {
    var docRef = db.collection("polls").doc(id);
    docRef.update({terminated: true})
      .then(() => {
        callback(null);
      })
      .catch(err => {
        callback(err);
      })
  },
  deletePoll: (linkId, callback) => {
    console.log("DELETE POLL WITH:", id);
  }
}