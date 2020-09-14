
function service(request, response)
{
	'use strict';
	try 
	{
		require('Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}