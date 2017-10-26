"use strict";


// Initialize Firebase
/*
Auhtor: Kian D.Rad
Date: Oct 17th 2017
ReadMe: Test file, to authenticate the firebase
ToDO: Take out this to javascript file with propoer data models
*/
var userModel = new function () {
    this.displayName = "macintosh";
    this.email = "red";
    this.isAnonymous = false;
    this.phoneNumber = "";
    this.photoURL = "";
    this.uid = "";
    this.emailVerified = "";
    this.refreshToken = "";
    this.providerData = "";
  //  this.verifiedEmail = function () {
  //      return this.color + ' ' + this.type + ' apple';
   // };
}

var config = {
        apiKey: "AIzaSyC8KloedMvZLdSqUMk74oE7IM0SF9bJCrw",
        authDomain: "idermatoscope.firebaseapp.com",
        databaseURL: "https://idermatoscope.firebaseio.com",
        projectId: "idermatoscope",
        storageBucket: "idermatoscope.appspot.com",
        messagingSenderId: "960111575797"
    };
firebase.initializeApp(config);

function CallGoogleSinIn() {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().languageCode = 'el';
    firebase.auth().signInWithRedirect(provider);
};


// Listening for auth state changes.
// [START authstatelistener]
firebase.auth().onAuthStateChanged(function (user) {
    debugger;
    // alert("here");
    if (user) {
        // User is signed in.
        userModel.displayName = user.displayName;
        userModel.email = user.email;
        userModel.emailVerified = user.emailVerified;
        userModel.photoURL = user.photoURL;
        userModel.isAnonymous = user.isAnonymous;
        userModel.uid = user.uid;
        userModel.providerData = user.providerData;
        userModel.refreshToken = user.refreshToken;
        userModel.photoURL = user.photoURL;
        userModel.phoneNumber = user.phoneNumber;
        debugger;

        // [START_EXCLUDE]
     //   document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
    //    document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        //              document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');

        // [END_EXCLUDE]
    } else {
        // User is signed out.
        // [START_EXCLUDE]
    //    document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
    //    document.getElementById('quickstart-sign-in').textContent = 'Sign in with GitHub';
    //    document.getElementById('quickstart-account-details').textContent = 'null';
    //    document.getElementById('quickstart-oauthtoken').textContent = 'null';
        // [END_EXCLUDE]
    }
    // [START_EXCLUDE]

    // [END_EXCLUDE]
});
// [END authstatelistener]



firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function () {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithRedirect(provider);
  })
  .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  });

function CallGoogleSinOut() {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        debugger;
        $('#theImg').remove();
        thirdMan();

    }).catch(function (error) {
        // An error happened.
        writeError("failed singout!");
    });


};




