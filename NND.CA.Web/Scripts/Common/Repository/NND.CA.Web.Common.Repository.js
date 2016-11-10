"use strict";


/* to write error managament service. This should be clearn*/
// DataObject that contains all calls to AJAX operations
var AsynchronousService = AsynchronousService || {};


// This is common library for all heavy lifting work. These should be centralized all here and consumed with modules. 
// service = DV,VPF or any other vertical
// controller = controller name that its suppose to fie to
// method = the name of the method that it suppose to call to 
// data = the actual data that is being transfered to the controller
// successMethod = the success method, that will manage the retun call from controller


var unitTest = function(i) {
    return 10;
};

var mathLib = {
    add5: function (a) {
        return a + 5;
    }
}
  