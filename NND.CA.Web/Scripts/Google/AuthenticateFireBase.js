"use strict";


// Initialize Firebase
/*
Auhtor: Kian D.Rad
Date: Oct 17th 2017
ReadMe: Test file, to authenticate the firebase
ToDO: Take out this to javascript file with propoer data models
*/

alert("here");
debugger;

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
        var defaultStorage = defaultApp.storage();
        var defaultDatabase = defaultApp.database();
        debugger;
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().languageCode = 'el';
    firebase.auth().signInWithRedirect(provider);
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });

    // You can retrieve services via the defaultApp variable...
    var defaultStorage = defaultApp.storage();
    var defaultDatabase = defaultApp.database();
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
};

function signinExistingUser() {

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
};






    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
        }
    });




$(document).ready(function () {
    // Handler for .ready() called.

    $("#googleLogin").click(function () {
        debugger;
        CallGoogleSinIn();
        alert("Handler for .click() called.");
    });
});

