const firebaseConfig = require('../firebaseConfig.js');
const firebase = require("firebase");
require("firebase/firestore");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase.firestore();
