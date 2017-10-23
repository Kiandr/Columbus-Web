"use strict";


// Initialize Firebase
/*
Auhtor: Kian D.Rad
Date: Oct 17th 2017
ReadMe: Test file, to authenticate the firebase
ToDO: Take out this to javascript file with propoer data models
*/

alert("here");
function CallGoogleSinIn() {

    var config = {
        apiKey: "AIzaSyBRGDNklfhLgeYdMutMuOQnv3jqfDyCRj0",
        authDomain: "nursenextdoor-ad735.firebaseapp.com",
        databaseURL: "https://nursenextdoor-ad735.firebaseio.com",
        projectId: "nursenextdoor-ad735",
        storageBucket: "nursenextdoor-ad735.appspot.com",
        messagingSenderId: "142428877752"
    };

    firebase.initializeApp(config);

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().languageCode = 'el';
    firebase.auth().signInWithRedirect(provider);
};


$(document).ready(function () {
    // Handler for .ready() called.

    $("#googleLogin").click(function () {
        debugger;
        CallGoogleSinIn();
        alert("Handler for .click() called.");
    });
});

