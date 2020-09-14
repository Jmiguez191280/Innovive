
function service(request, response)
{
	'use strict';
	try 
	{
		require('Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}