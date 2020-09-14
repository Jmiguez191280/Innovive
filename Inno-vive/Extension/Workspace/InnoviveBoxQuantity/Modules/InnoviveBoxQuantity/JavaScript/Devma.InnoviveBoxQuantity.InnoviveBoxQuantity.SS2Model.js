// Model.js
// -----------------------
// @module Case
define("Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/InnoviveBoxQuantity/SuiteScript2/InnoviveBoxQuantity.Service.ss"
            ),
            true
        )
});
});
