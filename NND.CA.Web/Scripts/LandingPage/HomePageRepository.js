/* Copyright (c) 1994-2014 Sage Software, Inc.  All rights reserved. */
"use strict";
var accountSetAjax = {
    call: function (method, data, successMethod) {
        var url = sg.utls.url.buildUrl("AP", "APAccountSet", method);
        sg.utls.ajaxPost(url, data, successMethod);
    }
};

var accountSetRepository = {
    get: function (id) {
        var data = { 'id': id };
        accountSetAjax.call("Get", data, accountSetUISuccess.get);
    },
    create: function () {
        var data = {};
        accountSetAjax.call("Create", data, accountSetUISuccess.create);
    },

    delete: function (id) {
        var data = { 'id': id };
        accountSetAjax.call("Delete", data, accountSetUISuccess.delete);
    },

    add: function (data) {
        accountSetAjax.call("Add", data, accountSetUISuccess.update);
    },

    update: function (data) {
        accountSetAjax.call("Save", data, accountSetUISuccess.update);
    },

    UpdateStatus: function (data) {
        accountSetAjax.call("UpdateStatus", data, accountSetUISuccess.updateStatus);
    },
    getAccountDescriptionData: function (model) {

        var accountType;
        switch (accountSetUI.type) {
            case AccountType.PayablesControl: accountType = AccountType.PayablesControl;
                break;
            case AccountType.Discounts: accountType = AccountType.Discounts;
                break;
            case AccountType.Prepayment: accountType = AccountType.Prepayment;
                break;
            case AccountType.Retainage: accountType = AccountType.Retainage;
                break;
            case AccountType.UnrealizedExchangeGain: accountType = AccountType.UnrealizedExchangeGain;
                break;
            case AccountType.UnrealizedExchangeLoss: accountType = AccountType.UnrealizedExchangeLoss;
                break;
            case AccountType.ExchangeGain: accountType = AccountType.ExchangeGain;
                break;
            case AccountType.ExchangeLoss: accountType = AccountType.ExchangeLoss;
                break;
            case AccountType.ExchangeRounding: accountType = AccountType.ExchangeRounding;
                break;
            default:
        }
        var data = { 'model': model, 'accountType': accountType };
        window.sg.utls.ajaxPostSync(window.sg.utls.url.buildUrl("AP", "APAccountSet", "GetAccountDescription"), data, accountSetUISuccess.actDescription);
    },
    getCurrencyDescription: function (data) {
        window.sg.utls.ajaxPostSync(window.sg.utls.url.buildUrl("AP", "APAccountSet", "GetCurrencyDescription"), data, accountSetUISuccess.currencyDescription);
    },
};

