"use strict";
var constants = { token: null };
var googleConstants = { config: null }
var googleService = {
    init: function () {
        googleConstants.config = {
            apiKey: "AIzaSyC8KloedMvZLdSqUMk74oE7IM0SF9bJCrw",
            authDomain: "idermatoscope.firebaseapp.com",
            databaseURL: "https://idermatoscope.firebaseio.com",
            projectId: "idermatoscope",
            storageBucket: "idermatoscope.appspot.com",
            messagingSenderId: "960111575797"
        }
        debugger;
        firebase.initializeApp(googleConstants.config);
    },
    googleSingIn: function () {

    },
    googleSingOut: function () {

    },
    googleRegisterNewUser: function () {
        debugger;
        console.log("directing to google");
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().languageCode = 'el';
        firebase.auth().signInWithRedirect(provider);

    }
};


var services = {
    init: function () {
        // init the services
        this.setToken();
        this.setRegister();
        // inite the google and dependencies
        googleService.init();
        // user this class
    },
    registerNewUser: function () {
        console.log("Envoked new registeration");
        googleService.googleRegisterNewUser();
    },
    printToken: function () {
    },
    setToken: function () {
        console.log($('input[name="__RequestVerificationToken"]').val());
        constants.token = $('input[name="__RequestVerificationToken"]').val();
    },
    setRegister: function () {
      
        $("#register").click(function () {
            debugger;
            console.log(constants.token);
            // becuase it a call back function shall user the name of the class
            services.registerNewUser();

        });
     }
};


// on document load 
$(document).ready(function () {
    console.log(" Document is ready!");
    services.init();
});














/*
    services.RegisterNewUser = function(ViewModelUser) {
    console.log(ViewModelUser);
    token = $('input[name="__RequestVerificationToken"]').val();

    console.log(token);

    $.ajax(
    {
        url: '/account/register',
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            Email: ViewModelUser.email,
            ConfirmPassword: "Kian@1234",//ViewModelUser.uid,
            Password: "Kian@1234"//ViewModelUser.uid

        },
        success: function poste(data, textStatus, jqXHR) {
            debugger;
            $('#respond').html(data); return false;
        },
        error: function err(jqXHR, textStatus, errorThrown) {
            debugger;
            console.log('error at address :' + errorThrown);
        }
    });



}

var token;

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
    this.pictureShow = ko.observable(true);
    this.shouldShowMessageIn = ko.observable(false);
    this.shouldShowMessageOut = ko.observable(true);
    this.welcomingMessage = ko.pureComputed(function () {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return "Hello " + this.displayName() + " Its pleasure to have you with us.  ";
    }, this);
};
var ViewModelUserdefault = function () {

    $("#pictureShow").get().ko.observable(false);
    $("#shouldShowMessageOut").get().ko.observable(false);

};

var config = {
    apiKey: "AIzaSyC8KloedMvZLdSqUMk74oE7IM0SF9bJCrw",
    authDomain: "idermatoscope.firebaseapp.com",
    databaseURL: "https://idermatoscope.firebaseio.com",
    projectId: "idermatoscope",
    storageBucket: "idermatoscope.appspot.com",
    messagingSenderId: "960111575797"
};
firebase.initializeApp(config);
function CallGoogleSinOut() {
    debugger;
    firebase.auth().signOut().then(function () {
        //  ViewModelUser.shouldShowMessageIn(false);
    }).catch(function (error) {
        // An error happened.
        console.log("failed singout!" + error);
    });
};
function CallGoogleSinIn() {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().languageCode = 'el';
    firebase.auth().signInWithRedirect(provider);
};
$("#test").click(function () {
    token = $('input[name="__RequestVerificationToken"]').val();

    console.log(token);

    $.ajax(
    {
        url: '/account/register',
        type: 'POST',
        data: {
            __RequestVerificationToken: token,
            Email: "test2@gmail.com",
            ConfirmPassword: "Test@1234",
            Password: "Test@1234"

        },
        success: function poste(data, textStatus, jqXHR) { $('#respond').html(data); return false; },
        error: function err(jqXHR, textStatus, errorThrown) { console.log('error at address :' + errorThrown); }
    });



});
// callback functions
firebase.auth().onAuthStateChanged(function (user) {
    // Listening for auth state changes.
    // [START authstatelistener]
    debugger;
    // alert("here");
    if (user) {
        //  ko.applyBindings(new ViewModel("Planet", "Earth")); // This makes Knockout get to work
        ko.applyBindings(new ViewModelUser(user)); // This makes Knockout get to work
        // call to server to register user in the local Db
        registerUser(user);
    } else {

    }
    // [END authstatelistener]
});

*/