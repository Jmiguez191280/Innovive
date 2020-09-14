
function service(request, response)
{
	'use strict';
	try 
	{
		require('Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}