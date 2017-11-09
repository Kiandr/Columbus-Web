/* Copyright (c) 1994-2014 Sage Software, Inc.  All rights reserved. */
"use strict";

function accountSetObservableExtension(accountSetModel, uiMode) {
    var model = accountSetModel.Data;
    model.UIMode = ko.observable(uiMode);

    model.Inactive = ko.computed({
        read: function () {
            return (model.Status() === accountSetUI.status.InActive);
        },
        write: function (value) {
            if (value) {
                model.Status(accountSetUI.status.InActive);
            } else {
                model.Status(accountSetUI.status.Active);
            }
        }
    });

    model.ComputedInactiveDate = ko.computed(function () {
        if (model.Status() === accountSetUI.status.Active) {
            return null;
        } else {
            return sg.utls.kndoUI.getFormattedDate(model.InactiveDate()) ? sg.utls.kndoUI.getFormattedDate(model.InactiveDate()) : accountSetModel.FormattedInactiveDate();
        }
    });

    model.ComputedLastMaintainedDate = ko.computed(function () {
        return sg.utls.kndoUI.getFormattedDate(model.DateLastMaintained());
    });


    model.ComputedFunctionalCurrency = ko.computed(function () {
        if (model.CurrencyCodeforAccount() != accountSetUI.functionalCurrency && accountSetModel.IsValidCurrency()) {
            return false;
        } else {
            return true;
        }
    });

    model.ComputedGainOrLoss = ko.computed(function () {
        if (model.CurrencyCodeforAccount() != accountSetUI.functionalCurrency && accountSetModel.IsValidCurrency()) {
            return (accountSetModel.GainOrLossAccountingMethod() === GainOrLossAccounting.RecognizedGainOrLoss);
        }
        return true;
    });

};

