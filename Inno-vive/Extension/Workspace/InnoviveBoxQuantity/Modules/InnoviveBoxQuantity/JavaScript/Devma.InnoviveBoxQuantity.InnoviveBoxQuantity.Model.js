// Model.js
// -----------------------
// @module Case
define("Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({

        
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "services/InnoviveBoxQuantity.Service.ss"
            )
        )
        
});
});
