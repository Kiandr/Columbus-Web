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
    debugger;
    this.displayName = ko.observable(user.displayName);
    this.email = ko.observable(user.email);
    this.userImage = ko.observable(user.photoURL);
    this.shouldShowMessage = ko.observable(false); // Message initially visible //shouldShowSingOutMessage
    this.shouldShowSingOutMessage = ko.observable(false);
    this.shouldShowSingOutMessage = ko.observable(true);
    
    this.welcomingMessage = ko.pureComputed(function () {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return "Hello " +this.displayName() + " Its pleasure to have you with us.  ";
    }, this);
};

//var userDataModel = new function (incomingUserDataModel) {
//    debugger;
//    this.displayName = ko.observable(incomingUserDataModel.displayName);
//    this.email = ko.observable(incomingUserDataModel.email);
//    this.isAnonymous = ko.observable(incomingUserDataModel.isAnonymous);
//    this.phoneNumber = ko.observable(incomingUserDataModel.phoneNumber);
//    this.photoURL = ko.observable(incomingUserDataModel.photoURL);
//    this.uid = ko.observable(incomingUserDataModel.uid);
//    this.emailVerified = ko.observable(incomingUserDataModel.emailVerified);
//    this.refreshToken = ko.observable(incomingUserDataModel.refreshToken);
//    this.providerData = ko.observable(incomingUserDataModel.providerData);

//}


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

