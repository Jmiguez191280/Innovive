// @module Devma.InnoviveBoxQuantity.InnoviveBoxQuantity
define('Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.View'
,	[
	'devma_innoviveboxquantity_innoviveboxquantity.tpl'
	
	,	'Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.SS2Model'
	
	,	'Backbone'
    ]
, function (
	devma_innoviveboxquantity_innoviveboxquantity_tpl
	
	,	InnoviveBoxQuantitySS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.View @extends Backbone.View
	return Backbone.View.extend({

		template: devma_innoviveboxquantity_innoviveboxquantity_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new InnoviveBoxQuantityModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.View.Context
	,	getContext: function getContext()
		{
			//@class Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
