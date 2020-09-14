// @module Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox
define('Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox.View'
,	[
	'devma_innoviveitemquantityperbox_innoviveitemquantityperbox.tpl'
	
	,	'Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox.SS2Model'
	
	,	'Backbone'
	
    ]
, function (
	devma_innoviveitemquantityperbox_innoviveitemquantityperbox_tpl
	
	,	InnoviveItemQuantityPerBoxSS2Model
	
	,	Backbone
	
)
{
    'use strict';

	// @class Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox.View @extends Backbone.View
	return Backbone.View.extend({

		template: devma_innoviveitemquantityperbox_innoviveitemquantityperbox_tpl
	

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new InnoviveItemQuantityPerBoxModel();
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

		},

		

		//@method getContext @return Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox.View.Context
		getContext: function getContext()
    	{
			//@class Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
