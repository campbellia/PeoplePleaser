const dotenv = require('dotenv');
dotenv.config();
const config = require("../firebaseConfig.js");
const firebase = require("firebase");
require("firebase/firestore");

// Initialize Firebase
firebase.initializeApp(config);

module.exports = firebase.firestore();
