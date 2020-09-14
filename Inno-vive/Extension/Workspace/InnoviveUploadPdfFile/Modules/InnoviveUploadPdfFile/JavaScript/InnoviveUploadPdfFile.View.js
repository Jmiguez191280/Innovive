// @module Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile
define('Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.View'
,	[
	'devma_innoviveuploadpdffile_innoviveuploadpdffile.tpl'
	
	,	'Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.SS2Model'
	
	,	'Backbone'
    ]
, function (
	devma_innoviveuploadpdffile_innoviveuploadpdffile_tpl
	
	,	InnoviveUploadPdfFileSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.View @extends Backbone.View
	return Backbone.View.extend({

		template: devma_innoviveuploadpdffile_innoviveuploadpdffile_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new InnoviveUploadPdfFileModel();
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

		//@method getContext @return Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.View.Context
	,	getContext: function getContext()
		{
			//@class Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
