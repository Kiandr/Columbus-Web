/* Copyright (c) 1994-2014 Sage Software, Inc.  All rights reserved. */
"use strict";
var modelData;
var AccountType = { PayablesControl: 1, Discounts: 2, Prepayment: 3, Retainage: 4, UnrealizedExchangeGain: 5, UnrealizedExchangeLoss: 6, ExchangeGain: 7, ExchangeLoss: 8, ExchangeRounding: 9 };
var GainOrLossAccounting = { RealizedandUnrealizedGainOrLoss: 1, RecognizedGainOrLoss: 2 };
var accountSetUI = accountSetUI || {};
accountSetUI = {
    accountSetModel: {},
    status: { InActive: 0, Active: 1 },
    type: null,
    ignoreIsDirtyProperties: ["AccountSetCode"],
    computedProperties: ["UIMode", "Inactive", "ComputedInactiveDate", "ComputedFunctionalCurrency"],
    hasKoBindingApplied: false,
    isKendoControlNotInitialised: false,
    accountSetCode: null,
    checkStatus: true,
    functionalCurrency: null,
    funCurrencyDescription: null,
    isValidCurrency: true,
    init: function () {
        accountSetUI.initButtons();
        accountSetUI.initOnBlur();
        accountSetUI.initFinders();
        accountSetUISuccess.initialLoad(AccountSetViewModel);
        accountSetUISuccess.setkey();
    },
    saveAccountSet: function () {
        if ($("#frmAccountSet").valid()) {
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            if (modelData.UIMode() === sg.utls.OperationMode.SAVE) {
                accountSetRepository.update(data);
            } else {
                accountSetRepository.add(data);
            }
        }
    },
    initButtons: function () {
        sg.exportHelper.setExportEvent("btnOptionExport", sg.dataMigration.APAccountSet, false, $.noop);
        sg.importHelper.setImportEvent("btnOptionImport", sg.dataMigration.APAccountSet, false, $.noop);

        $("#btnNew").bind('click', function () {
            accountSetUI.checkIsDirty(accountSetUI.create, accountSetUI.accountSetCode);
        });

        $("#btnSave").bind('click', function () {
            sg.utls.SyncExecute(accountSetUI.saveAccountSet);
        });

        $("#btnDelete").bind('click', function () {
            if ($("#frmAccountSet").valid()) {
                var message = jQuery.validator.format(accountSetResources.DeleteConfirmMessage, accountSetResources.AccountSetCodeTitle, modelData.AccountSetCode());
                sg.utls.showKendoConfirmationDialog(function () {
                    sg.utls.clearValidations("frmAccountSet");
                    accountSetRepository.delete(modelData.AccountSetCode());
                }, null, message, accountSetResources.DeleteTitle);
            }
        });
    },
    initOnBlur: function () {

        $("#Data_AccountSetCode").bind('blur', function (e) {
            //The below line of code is not correct as KO should only do this.
            //KO is not firing because Masking is there. This doesn't happens in the new version of mask plugin.
            //We can remove this once new version is applied.
            modelData.AccountSetCode($("#Data_AccountSetCode").val());
            sg.delayOnBlur("btnFinderAccSetCode", function () {
                if (sg.controls.GetString(modelData.AccountSetCode())) {
                    if (sg.controls.GetString(accountSetUI.accountSetCode) !== sg.controls.GetString(modelData.AccountSetCode())) {
                        accountSetUI.checkIsDirty(accountSetUI.get, accountSetUI.accountSetCode);
                    }
                }
            });
        });

        $("#Data_PayablesControlAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderPayControlAccount", function () {
                accountSetUI.type = AccountType.PayablesControl;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });
        $("#Data_DiscountsAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderDiscountsAccount", function () {
                accountSetUI.type = AccountType.Discounts;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });
        $("#Data_PrepaymentAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderPrepaymentAccount", function () {
                accountSetUI.type = AccountType.Prepayment;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });
        $("#Data_RetainageAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderRetainageAccount", function () {
                accountSetUI.type = AccountType.Retainage;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });
        $("#Data_UnrealizedExchangeGainAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderUnExchangeGainAccount", function () {
                accountSetUI.type = AccountType.UnrealizedExchangeGain;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });
        $("#Data_UnrealizedExchangeLossAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderUnExchangeLossAccount", function () {
                accountSetUI.type = AccountType.UnrealizedExchangeLoss;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });
        $("#Data_ExchangeGainAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderExchangeGainAccount", function () {
                accountSetUI.type = AccountType.ExchangeGain;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });
        $("#Data_ExchangeLossAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderExchangeLossAccount", function () {
                accountSetUI.type = AccountType.ExchangeLoss;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });
        $("#Data_ExchangeRoundingAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderExchangeRoundingAccount", function () {
                accountSetUI.type = AccountType.ExchangeRounding;
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getAccountDescriptionData(data);
            });
        });

        $("#Data_CurrencyCodeforAccount").bind('change', function (e) {
            sg.delayOnBlur("btnFinderCurrency", function () {
                var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                accountSetRepository.getCurrencyDescription(data);
            });
        });

    },
    initFinders: function () {
        var title = jQuery.validator.format(accountSetResources.FinderTitle, accountSetResources.AccountSetFinderTitle);
        sg.finderHelper.setFinder("btnFinderAccSetCode", sg.finder.APAccountSet, onFinderSuccess.finderSuccess, $.noop, title, accountSetFilter.getFilter);
        sg.finderHelper.setFinder("btnFinderCurrency", sg.finder.CurrencyCode, onFinderSuccess.currencyCode, $.noop, title, accountSetFilter.getCurrencyCode, null, true);

        var accountTitle = jQuery.validator.format(accountSetResources.FinderTitle, accountSetResources.AccountTitle);
        sg.finderHelper.setFinder("btnFinderPayControlAccount", sg.finder.AccountDistribution, onFinderSuccess.payControlAcct, $.noop, accountTitle, accountSetFilter.getPayControlAcct, null, true);
        sg.finderHelper.setFinder("btnFinderDiscountsAccount", sg.finder.AccountDistribution, onFinderSuccess.discountAcct, $.noop, accountTitle, accountSetFilter.getdiscountAcct, null, true);
        sg.finderHelper.setFinder("btnFinderPrepaymentAccount", sg.finder.AccountDistribution, onFinderSuccess.prepaymentAcct, $.noop, accountTitle, accountSetFilter.getPrepaymentAcct, null, true);
        sg.finderHelper.setFinder("btnFinderRetainageAccount", sg.finder.AccountDistribution, onFinderSuccess.retainageAcct, $.noop, accountTitle, accountSetFilter.getRetainageAcct, null, true);
        sg.finderHelper.setFinder("btnFinderUnExchangeGainAccount", sg.finder.AccountDistribution, onFinderSuccess.unExchangeGainAcct, $.noop, accountTitle, accountSetFilter.getUnExchangeGainAcct, null, true);
        sg.finderHelper.setFinder("btnFinderUnExchangeLossAccount", sg.finder.AccountDistribution, onFinderSuccess.unExchangeLossAcct, $.noop, accountTitle, accountSetFilter.getUnExchangeLossAcct, null, true);
        sg.finderHelper.setFinder("btnFinderExchangeGainAccount", sg.finder.AccountDistribution, onFinderSuccess.exchangeGainAcct, $.noop, accountTitle, accountSetFilter.getExchangeGainAcct, null, true);
        sg.finderHelper.setFinder("btnFinderExchangeLossAccount", sg.finder.AccountDistribution, onFinderSuccess.exchangeLossAcct, $.noop, accountTitle, accountSetFilter.getExchangeLossAcct, null, true);
        sg.finderHelper.setFinder("btnFinderExchangeRoundingAccount", sg.finder.AccountDistribution, onFinderSuccess.exchangeRoundingAcct, $.noop, accountTitle, accountSetFilter.getExchangeRoundingAcct, null, true);
    },
    get: function () {
        accountSetRepository.get(modelData.AccountSetCode());
    },
    create: function () {
        sg.utls.clearValidations("frmAccountSet");
        accountSetRepository.create();
    },
    statusChange: function (value) {
        if (value && sg.controls.GetString(modelData.AccountSetCode() !== "")) {
            if ($("#frmAccountSet").valid()
                && modelData.UIMode() === sg.utls.OperationMode.SAVE) {
                if (accountSetUI.checkStatus) {
                    var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
                    accountSetRepository.UpdateStatus(data);
                }
                accountSetUI.checkStatus = true;
            }
        }
    },
    checkIsDirty: function (funcionToCall, accountSet) {
        if (accountSetUI.accountSetModel.isModelDirty.isDirty() && accountSet !== null && accountSet !== "") {
            sg.utls.showKendoConfirmationDialog(
                function () { // Yes
                    sg.utls.clearValidations("frmAccountSet");
                    sg.controls.enable('#Data_CurrencyCodeforAccount');
                    sg.controls.enable('#btnFinderCurrency');
                    funcionToCall.call();
                },
                function () { // No
                    if (sg.controls.GetString(accountSet) !== sg.controls.GetString(modelData.AccountSetCode())) {
                        modelData.AccountSetCode(accountSet);
                    }
                    return;
                },
                jQuery.validator.format(globalResource.SaveConfirm, accountSetResources.AccountSetCodeTitle, accountSet));
        } else {
            sg.controls.enable('#Data_CurrencyCodeforAccount');
            sg.controls.enable('#btnFinderCurrency');
            funcionToCall.call();
        }
    },
    clearCurrencyAccount: function () {
        modelData.UnrealizedExchangeGainAccount(null);
        accountSetUI.accountSetModel.UnrealizedExchangeGainDesc(null);
        modelData.UnrealizedExchangeLossAccount(null);
        accountSetUI.accountSetModel.UnrealizedExchangeLossDesc(null);
        modelData.ExchangeGainAccount(null);
        accountSetUI.accountSetModel.ExchangeGainDesc(null);
        modelData.ExchangeLossAccount(null);
        accountSetUI.accountSetModel.ExchangeLossDesc(null);
        modelData.ExchangeRoundingAccount(null);
        accountSetUI.accountSetModel.ExchangeRoundingDesc(null);
    },
};
var onFinderSuccess = {

    finderSuccess: function (result) {
        sg.utls.clearValidations("frmAccountSet");
        accountSetUI.finderData = result;
        accountSetUI.checkIsDirty(accountSetUISuccess.setFinderData, accountSetUI.accountSetCode);

    },
    currencyCode: function (result) {
        if (result !== null) {
            var currencyCode = result.CurrencyCodeId;
            modelData.CurrencyCodeforAccount(currencyCode);
            var result = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getCurrencyDescription(result);
        }
    },
    payControlAcct: function (result) {
        if (result !== null) {
            modelData.PayablesControlAccount(result.AccountNumber);
            accountSetUI.type = AccountType.PayablesControl;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },
    discountAcct: function (result) {
        if (result !== null) {
            modelData.DiscountsAccount(result.AccountNumber);
            accountSetUI.type = AccountType.Discounts;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },
    prepaymentAcct: function (result) {
        if (result !== null) {
            modelData.PrepaymentAccount(result.AccountNumber);
            accountSetUI.type = AccountType.Prepayment;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },
    retainageAcct: function (result) {
        if (result !== null) {
            modelData.RetainageAccount(result.AccountNumber);
            accountSetUI.type = AccountType.Retainage;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },
    unExchangeGainAcct: function (result) {
        if (result !== null) {
            modelData.UnrealizedExchangeGainAccount(result.AccountNumber);
            accountSetUI.type = AccountType.UnrealizedExchangeGain;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },
    unExchangeLossAcct: function (result) {
        if (result !== null) {
            modelData.UnrealizedExchangeLossAccount(result.AccountNumber);
            accountSetUI.type = AccountType.UnrealizedExchangeLoss;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },
    exchangeGainAcct: function (result) {
        if (result !== null) {
            modelData.ExchangeGainAccount(result.AccountNumber);
            accountSetUI.type = AccountType.ExchangeGain;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },
    exchangeLossAcct: function (result) {
        if (result !== null) {
            modelData.ExchangeLossAccount(result.AccountNumber);
            accountSetUI.type = AccountType.ExchangeLoss;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },
    exchangeRoundingAcct: function (result) {
        if (result !== null) {
            modelData.ExchangeRoundingAccount(result.AccountNumber);
            accountSetUI.type = AccountType.ExchangeRounding;
            var data = sg.utls.ko.toJS(modelData, accountSetUI.computedProperties);
            accountSetRepository.getAccountDescriptionData(data);
        }
    },


}
var accountSetUISuccess = {

    setkey: function () {
        accountSetUI.accountSetCode = modelData.AccountSetCode();
    },
    get: function (jsonResult) {
        if (jsonResult.UserMessage && jsonResult.UserMessage.IsSuccess) {
            if (jsonResult.Data !== null) {
                accountSetUI.checkStatus = (jsonResult.Data.Status === accountSetUI.status.Active);
                accountSetUISuccess.displayResult(jsonResult, sg.utls.OperationMode.SAVE);
            } else {
                modelData.UIMode(sg.utls.OperationMode.NEW);
            }
        }
        else {
            modelData.UIMode(sg.utls.OperationMode.NEW)
        }
        accountSetUISuccess.setkey();
        sg.controls.Select($("#txtDescription"));
    },
    update: function (jsonResult) {
        if (jsonResult.UserMessage.IsSuccess) {
            accountSetUISuccess.displayResult(jsonResult, sg.utls.OperationMode.SAVE);
            accountSetUISuccess.setkey();
        }
        sg.utls.showMessage(jsonResult);
    },
    updateStatus: function (jsonResult) {
        if (!jsonResult.UserMessage.IsSuccess) {
            modelData.Status(accountSetUI.status.Active);
            window.sg.utls.showMessage(jsonResult)
        }
    },
    create: function (jsonResult) {
        accountSetUISuccess.displayResult(jsonResult, sg.utls.OperationMode.NEW);
        accountSetUI.accountSetModel.isModelDirty.reset();
        accountSetUISuccess.setkey();
        sg.controls.Focus($("#Data_AccountSetCode"));
        modelData.CurrencyCodeforAccount(accountSetUI.functionalCurrency);
        accountSetUI.accountSetModel.CurrencyDesc(accountSetUI.funCurrencyDescription);
    },
    delete: function (jsonResult) {
        if (jsonResult.UserMessage.IsSuccess) {
            accountSetUISuccess.displayResult(jsonResult, sg.utls.OperationMode.NEW);
            accountSetUI.accountSetModel.isModelDirty.reset();
            accountSetUISuccess.setkey();
        }
        sg.utls.showMessage(jsonResult);
    },
    displayResult: function (jsonResult, uiMode) {
        if (jsonResult !== null) {
            if (!accountSetUI.hasKoBindingApplied) {
                accountSetUI.accountSetModel = ko.mapping.fromJS(jsonResult);
                accountSetUI.hasKoBindingApplied = true;
                modelData = accountSetUI.accountSetModel.Data;
                accountSetUI.functionalCurrency = modelData.CurrencyCodeforAccount();
                accountSetUI.funCurrencyDescription = accountSetUI.accountSetModel.CurrencyDesc();
                accountSetObservableExtension(accountSetUI.accountSetModel, uiMode);
                modelData.Inactive.subscribe(accountSetUI.statusChange);
                // modelData.ComputedFunctionalCurrency.subscribe(accountSetUI.currencyDescription);
                accountSetUI.accountSetModel.isModelDirty = new ko.dirtyFlag(modelData, accountSetUI.ignoreIsDirtyProperties);
                ko.applyBindings(accountSetUI.accountSetModel);
            } else {
                ko.mapping.fromJS(jsonResult, accountSetUI.accountSetModel);
                modelData.UIMode(uiMode);
                if (uiMode !== sg.utls.OperationMode.NEW) {
                    accountSetUI.accountSetModel.isModelDirty.reset();
                    sg.controls.disable('#Data_CurrencyCodeforAccount');
                    sg.controls.disable('#btnFinderCurrency');
                }
                if (uiMode === sg.utls.OperationMode.NEW) {
                    sg.controls.enable('#Data_CurrencyCodeforAccount');
                    sg.controls.enable('#btnFinderCurrency');

                }
            }
        }
    },
    initialLoad: function (result) {
        if (result) {
            accountSetUISuccess.displayResult(result, sg.utls.OperationMode.NEW);
        }
        else {
            sg.utls.showMessageInfo(sg.utls.msgType.ERROR, sourceCodeResources.ProcessFailedMessage);
        }
        sg.controls.Focus($("#Data_AccountSetCode"));
    },
    setFinderData: function () {
        accountSetRepository.get(accountSetUI.finderData.AccountSetCode);
        accountSetUISuccess.setkey();
        $("#message").empty();
    },
    isNew: function (model) {
        if (model.accountSetCode() === null) {
            return true;
        }
        return false;
    },
    actDescription: function (result) {
        if (result !== null) {
            switch (accountSetUI.type) {
                case AccountType.PayablesControl:
                    modelData.PayablesControlAccount(result.Data.PayablesControlAccount);
                    accountSetUI.accountSetModel.PayablesControlDesc(result.PayablesControlDesc);
                    break;
                case AccountType.Discounts:
                    modelData.DiscountsAccount(result.Data.DiscountsAccount);
                    accountSetUI.accountSetModel.DiscountsDesc(result.DiscountsDesc);
                    break;
                case AccountType.Prepayment:
                    modelData.PrepaymentAccount(result.Data.PrepaymentAccount);
                    accountSetUI.accountSetModel.PrepaymentDesc(result.PrepaymentDesc);
                    break;
                case AccountType.Retainage:
                    modelData.RetainageAccount(result.Data.RetainageAccount);
                    accountSetUI.accountSetModel.RetainageDesc(result.RetainageDesc);
                    break;
                case AccountType.UnrealizedExchangeGain:
                    modelData.UnrealizedExchangeGainAccount(result.Data.UnrealizedExchangeGainAccount);
                    accountSetUI.accountSetModel.UnrealizedExchangeGainDesc(result.UnrealizedExchangeGainDesc);
                    break;
                case AccountType.UnrealizedExchangeLoss:
                    modelData.UnrealizedExchangeLossAccount(result.Data.UnrealizedExchangeLossAccount);
                    accountSetUI.accountSetModel.UnrealizedExchangeLossDesc(result.UnrealizedExchangeLossDesc);
                    break;
                case AccountType.ExchangeGain:
                    modelData.ExchangeGainAccount(result.Data.ExchangeGainAccount);
                    accountSetUI.accountSetModel.ExchangeGainDesc(result.ExchangeGainDesc);
                    break;
                case AccountType.ExchangeLoss:
                    modelData.ExchangeLossAccount(result.Data.ExchangeLossAccount);
                    accountSetUI.accountSetModel.ExchangeLossDesc(result.ExchangeLossDesc);
                    break;
                case AccountType.ExchangeRounding:
                    modelData.ExchangeRoundingAccount(result.Data.ExchangeRoundingAccount);
                    accountSetUI.accountSetModel.ExchangeRoundingDesc(result.ExchangeRoundingDesc);
                    break;
                default:
            }

            if (result.UserMessage.Warnings !== null || result.UserMessage.Errors !== null) {
                switch (accountSetUI.type) {
                    case AccountType.PayablesControl:
                        sg.controls.Focus($("#Data_PayablesControlAccount"));
                        break;
                    case AccountType.Discounts:
                        sg.controls.Focus($("#Data_DiscountsAccount"));
                        break;
                    case AccountType.Prepayment:
                        sg.controls.Focus($("#Data_PrepaymentAccount"));
                        break;
                    case AccountType.Retainage:
                        sg.controls.Focus($("#Data_RetainageAccount"));
                        break;
                    case AccountType.UnrealizedExchangeGain:
                        sg.controls.Focus($("#Data_UnrealizedExchangeGainAccount"));
                        break;
                    case AccountType.UnrealizedExchangeLoss:
                        sg.controls.Focus($("#Data_UnrealizedExchangeLossAccount"));
                        break;
                    case AccountType.ExchangeGain:
                        sg.controls.Focus($("#Data_ExchangeGainAccount"));
                        break;
                    case AccountType.ExchangeLoss:
                        sg.controls.Focus($("#Data_ExchangeLossAccount"));
                        break;
                    case AccountType.ExchangeRounding:
                        sg.controls.Focus($("#Data_ExchangeRoundingAccount"));
                    default:
                }
                accountSetUI.type = null;

            }
            sg.utls.showMessage(result);
        }
    },
    currencyDescription: function (result) {
        if (result !== null) {
            accountSetUI.accountSetModel.CurrencyDesc(result.CurrencyDesc);
            if (modelData.CurrencyCodeforAccount() === accountSetUI.functionalCurrency)
                accountSetUI.clearCurrencyAccount();
            if (!result.UserMessage.IsSuccess) {
                sg.controls.Focus($("#Data_CurrencyCodeforAccount"));
            }
            accountSetUI.accountSetModel.IsValidCurrency(result.IsValidCurrency);
            modelData.CurrencyCodeforAccount(result.Data.CurrencyCodeforAccount);
        }

        window.sg.utls.showMessage(result);
    }
};
var accountSetFilter = {
    getFilter: function () {
        var filters = [[]];
        filters[0][0] = sg.finderHelper.createFilter("AccountSetCode", sg.finderOperator.StartsWith, modelData.AccountSetCode());
        return filters;
    },
    getCurrencyCode: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_CurrencyCodeforAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("CurrencyCodeId", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getPayControlAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_PayablesControlAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getdiscountAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_DiscountsAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getPrepaymentAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_PrepaymentAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getRetainageAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_RetainageAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getUnExchangeGainAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_UnrealizedExchangeGainAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getUnExchangeLossAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_UnrealizedExchangeLossAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getExchangeGainAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_ExchangeGainAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getExchangeLossAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_ExchangeLossAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },
    getExchangeRoundingAcct: function () {
        var filters = [[]];
        var AccountNumber = $("#Data_ExchangeRoundingAccount").val();
        filters[0][0] = sg.finderHelper.createFilter("AccountNumber", sg.finderOperator.StartsWith, AccountNumber);
        return filters;
    },

};
$(function () {
    accountSetUI.init();
    $(window).bind('beforeunload', function () {
        if (globalResource.AllowPageUnloadEvent && accountSetUI.accountSetModel.isModelDirty.isDirty()) {
            return jQuery('<div />').html(jQuery.validator.format(globalResource.SaveConfirm2, accountSetResources.AccountSetTitle)).text();


        }
    });

});
