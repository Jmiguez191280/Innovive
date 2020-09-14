
define(
	'Devma.InnoviveBoxQuantity.InnoviveBoxQuantity'
	, [
		'Devma.InnoviveBoxQuantity.InnoviveBoxQuantity.View',
		'Item.Model',
		'Handlebars'
	]
	, function (
		InnoviveBoxQuantityView,
		ItemDetailsModel,
		Handlebars
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				Handlebars.registerHelper('multiply', function (a, b) {
				
					console.log(a);
					console.log(b);
					return Number(a) * Number(b);
				});
				Handlebars.registerHelper('multiplyFormatted', function (a, b) {
					return Handlebars.helpers.formatCurrency(Handlebars.helpers.multiply(a, b));
				});

				console.log(container);
				var pdp = container.getComponent("PDP");
				console.log(pdp);
			}
		};
	});
