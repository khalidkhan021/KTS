
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase.js');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBPk4r4T1XXxQvLjRo60LqQPwGfJ47m7E4",
    authDomain: "saylani-project-482e8.firebaseapp.com",
    databaseURL: "https://saylani-project-482e8.firebaseio.com",
    projectId: "saylani-project-482e8",
    storageBucket: "saylani-project-482e8.appspot.com",
    messagingSenderId: "315440717934"
  };
  firebase.initializeApp(config);

const messaging = firebase.messaging();