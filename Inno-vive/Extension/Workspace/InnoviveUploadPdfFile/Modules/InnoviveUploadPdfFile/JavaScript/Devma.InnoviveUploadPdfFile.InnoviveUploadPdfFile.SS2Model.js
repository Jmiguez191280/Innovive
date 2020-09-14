// Model.js
// -----------------------
// @module Case
define("Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/InnoviveUploadPdfFile/SuiteScript2/InnoviveUploadPdfFile.Service.ss"
            ),
            true
        )
});
});
