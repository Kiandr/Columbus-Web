"use strict";


// Initialize Firebase
/*
Auhtor: Kian D.Rad
Date: Oct 17th 2017
ReadMe: Test file, to authenticate the firebase
ToDO: Take out this to javascript file with propoer data models
*/


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


var ViewModel = function (first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);

    this.welcomingMessage = ko.pureComputed(function () {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);
};

var ViewModelUser = function (user) {

    this.displayName = ko.observable(user.displayName);
    this.email = ko.observable(user.email);
    this.userImage = ko.observable(user.photoURL);
    this.pictureShow = ko.observable(true);
    this.shouldShowMessageIn = ko.observable(false);
    this.shouldShowMessageOut = ko.observable(true);
    this.welcomingMessage = ko.pureComputed(function () {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return "Hello " +this.displayName() + " Its pleasure to have you with us.  ";
    }, this);
};


var ViewModelUserdefault = function () {

    $("#pictureShow").get().ko.observable(false);
    $("#shouldShowMessageOut").get().ko.observable(false);

};

  function CallGoogleSinOut() {
      firebase.auth().signOut().then(function () {
          ViewModelUser.shouldShowMessageIn(false);
      }).catch(function (error) {
          // An error happened.
          console.log("failed singout!"+error);
      });
  };




// Listening for auth state changes.
// [START authstatelistener]
firebase.auth().onAuthStateChanged(function (user) {
    debugger;
    // alert("here");
    if (user) {
      //  ko.applyBindings(new ViewModel("Planet", "Earth")); // This makes Knockout get to work
        ko.applyBindings(new ViewModelUser(user)); // This makes Knockout get to work

    } else {

    }

});
// [END authstatelistener]



