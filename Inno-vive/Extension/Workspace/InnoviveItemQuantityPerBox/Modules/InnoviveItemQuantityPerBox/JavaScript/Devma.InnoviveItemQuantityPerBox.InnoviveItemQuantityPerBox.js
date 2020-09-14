
define(
	'Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox'
	, [
		'Devma.InnoviveItemQuantityPerBox.InnoviveItemQuantityPerBox.View'
		, 'ProductDetails.Quantity.View'
		, 'Product.Model'
		, 'Cart.Item.Summary.View'
		, 'QuickAdd.View'
		, 'Cart.Detailed.View'
		, 'Transaction.Line.Model'
	]
	, function (
		InnoviveItemQuantityPerBoxView
		, ProductDetailsQuantityView
		, ProductModel
		, CartItemSummaryView
		, QuickAddView
		, CartDetailedView
		, TransactionLineModel
	) {
		'use strict';

		return {
			mountToApp: function mountToApp(container) {
				// using the 'Layout' component we add a new child view inside the 'Header' existing view 
				// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
				// more documentation of the Extensibility API in
				// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

				var layout = container.getComponent('Layout');
				var cart = container.getComponent("Cart");
				var pdp = container.getComponent("PDP");
				CartDetailedView.prototype.events = {
					'change [data-type="cart-item-quantity-input"]': 'itemsPerBox',
					'submit [data-action="update-quantity"]': 'updateItemQuantityFormSubmit',
					'click [data-action="remove-item"]': 'removeItem',
					'submit form[data-action="estimate-tax-ship"]': 'estimateTaxShip',
					'click [data-action="remove-shipping-address"]': 'removeShippingAddress',
					'click [data-touchpoint="checkout"]': 'trackEvent',
					'change [data-action="estimate-tax-ship-country"]': 'changeCountry'
				}

				CartDetailedView.prototype.itemsPerBox = function (e) {
					debugger;
					var element = jQuery('[data-type="cart-item-quantity-input"]');
					for (var i = 0; i < this.model.attributes.lines.models.length; i++) {
						var id = element[i].id;
						var qty = element[i].value;
						var item = this.model.attributes.lines.models[i].attributes.internalid;
						var perBox = this.model.attributes.lines.models[i].attributes.item.attributes.custitem_sales_qty_multiple;
						if (id.indexOf(item) != -1 && qty != '') {
							if (perBox) {
								jQuery('#case-quantity-' + item).val(perBox * parseInt(qty));
							} else {
								jQuery('#case-quantity-' + item).val('1');
							}


						}
					}
				};

				//Section Cart
				QuickAddView.prototype.selectAll = _.wrap(QuickAddView.prototype.selectAll, function (fn, e) {
					debugger;
					this.$('[name="quantity"]').select();
					var qty = this.$('[name="quantity"]').val();
					if (this.model.attributes.selectedProduct) {

						var qtyPerBox = this.model.attributes.selectedProduct.attributes.item.attributes.custitem_sales_qty_multiple;
						if (qtyPerBox) {
							if (jQuery('#case-quantity')) jQuery('#case-quantity').val(qtyPerBox * parseInt(qty));
						} else {
							if (jQuery('#case-quantity')) jQuery('#case-quantity').val('1');
						}

					}
				})
				//Section Cart
				QuickAddView.prototype.saveForm = _.wrap(QuickAddView.prototype.saveForm, function (fn, e) {
					debugger;
					e.preventDefault();

					Backbone.Validation.bind(this);

					this.model.set(this.$('form').serializeObject());

					const product = this.model.get('selectedProduct');

					if (this.model.isValid(true) && product) {
						product.set('quantity', parseInt(this.model.get('quantity'), 10));

						const selected_line = new TransactionLineModel(product.toJSON());

						selected_line.set('internalid', _.uniqueId('item_line'));
						selected_line.set('item', product.getItem().clone());
						selected_line.set('options', product.get('options').clone());

						// if the item is a matrix we add the parent so when saving the item in a product list (request a quote case)
						// we have the parent
						if (product.get('item').get('_matrixChilds').length) {
							selected_line.get('item').set('_matrixParent', product.get('item'));
						}
						selected_line.unset('selectedProduct');
						selected_line.unset('quickaddSearch');

						// @event {QuickAdd.View.SelectedLine.Properties} selectedLine
						this.trigger(
							'selectedLine',
							// @class QuickAdd.View.SelectedLine.Properties
							{
								// @property {Transaction.Line.Model} selectedLine
								selectedLine: selected_line
							}
						);
						// @class QuickAdd.View

						this.$('[name="quantity"]').val('');
						this.$('[name="quantity"]').attr({ min: 1 });
						this.$('[data-type="quick-add-reset"]').hide();
						this.itemsSearcherComponent.cleanSearch();
						this.itemsSearcherComponent.setFocus();
					}
					location.reload();
				});

				QuickAddView.prototype.resetHandle = _.wrap(QuickAddView.prototype.resetHandle, function (fn, e) {
					debugger;
					this.$('[data-type="quick-add-reset"]').hide();
					if (jQuery('#case-quantity')) jQuery('#case-quantity').val('');
					this.itemsSearcherComponent.cleanSearch();

				});

				var allItemsCart;
				if (cart) {
					layout.on('beforeShowContent', function () {
						debugger;
						var dataItemCart = [];
						cart.getLines().then(function (lines) {
							if (lines.length) {
								for (var x = 0; x < lines.length; x++) {
									dataItemCart.push({
										item: lines[x].internalid,
										qtyBox: lines[x].item.extras.custitem_sales_qty_multiple
									})
									console.log('lines', lines[x].item.extras.custitem_sales_qty_multiple)
								}
								allItemsCart = dataItemCart;
								console.log('lines2', JSON.stringify(allItemsCart))
							}
						});
					})

					layout.on('afterShowContent', function () {
						debugger;
						if (allItemsCart && allItemsCart.length) {

							for (var y = 0; y < allItemsCart.length; y++) {
								var element = jQuery('[data-type="cart-item-quantity-input"]');


								if (element[y] && element[y].id.indexOf(allItemsCart[y].item) != -1) {
									if (allItemsCart[y].qtyBox) {
										if (jQuery('#case-quantity-' + allItemsCart[y].item)) jQuery('#case-quantity-' + allItemsCart[y].item).val(allItemsCart[y].qtyBox * parseInt(element[y].value))
									} else {
										if (jQuery('#case-quantity-' + allItemsCart[y].item)) jQuery('#case-quantity-' + allItemsCart[y].item).val('1');
									}


								}

							}

						}


					})
				}

				//Set QTY Item page

				if (pdp) {
					debugger;
					layout.on('afterShowContent', function () {
						console.log(this)
						var iteminfo = pdp.getItemInfo();

						if (iteminfo) {
							var qtyBox = iteminfo.item.custitem_sales_qty_multiple;
							var element = jQuery('[name="quantity"]');
							if (qtyBox) {
								jQuery('#quantity_case').val(qtyBox * parseInt(element[0].value))
							} else {
								jQuery('#quantity_case').val('1')
							}


						}

					})
				}



				ProductDetailsQuantityView.prototype.setFocus = _.wrap(ProductDetailsQuantityView.prototype.setFocus, function (fn, e) {
					debugger;
					this.$('[name="quantity"]').focus();
					var qty = this.$('[name="quantity"]').val();
					var qtyPerBox = this.model.attributes.item.attributes.custitem_sales_qty_multiple;

					if (qtyPerBox) {
						jQuery('#quantity_case').val(qtyPerBox * parseInt(qty));
					} else {
						jQuery('#quantity_case').val('1');
					}



				});
				// ProductDetailsQuantityView.prototype.initialize= _.wrap(ProductDetailsQuantityView.prototype.initialize, function (fn, e) {
				CartItemSummaryView.prototype.addQuantity = _.wrap(ProductDetailsQuantityView.prototype.addQuantity, function (fn, e) {
					debugger;
					e.preventDefault();

					const $element = this.$(e.target);
					const quantity_input = $element.parent().find('input');
					const old_value = quantity_input.val();
					const max_quantity = this.model.get('item').get('_maximumQuantity', true);
					let new_val = parseFloat(old_value) + 1;

					new_val = max_quantity ? Math.min(max_quantity, new_val) : new_val;

					quantity_input.val(new_val);
					quantity_input.change();


				});


				// });
				/** @type {LayoutComponent} */
				// var layout = container.getComponent('Layout');

				if (layout) {
					layout.addChildView('Header.Logo', function () {
						return new InnoviveItemQuantityPerBoxView({ container: container });
					});
				}

			}
		};
	});
