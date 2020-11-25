
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
		, 'Utils'
		, 'Cart.AddToCart.Button.View'
		, 'LiveOrder.Line.Model'
		, 'Cart.Confirmation.Helpers'
		, 'Cart.Detailed.View'
		
		
	]
	, function (
		InnoviveItemQuantityPerBoxView
		, ProductDetailsQuantityView
		, ProductModel
		, CartItemSummaryView
		, QuickAddView
		, CartDetailedView
		, TransactionLineModel
		, Utils
		, AddToCartButtonView
        , LiveOrderLineModel
		, CartConfirmationHelpers
		, CartDetailView
		
		
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
				var myaccount = container.getComponent('MyAccountMenu');
				CartDetailedView.prototype.events = {
					'change [data-type="cart-item-quantity-input"]': 'itemsPerBox',
					'change [data-type="cart-item-quantity-input"]': 'debouncedUpdateItemQuantity',
					'keypress [data-type="cart-item-quantity-input"]': 'debouncedUpdateItemQuantity',
					'submit [data-action="update-quantity"]': 'updateItemQuantityFormSubmit',
					'click [data-action="remove-item"]': 'removeItem',
					'submit form[data-action="estimate-tax-ship"]': 'estimateTaxShip',
					'click [data-action="remove-shipping-address"]': 'removeShippingAddress',
					'click [data-touchpoint="checkout"]': 'trackEvent',
					'change [data-action="estimate-tax-ship-country"]': 'changeCountry'
				}

				CartDetailedView.prototype.itemsPerBox = function (e) {
				//	debugger;
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
								jQuery('#case-quantity-' + item).val(parseInt(qty) * 1);
							}


						}
					}
				};

				CartDetailedView.prototype.debouncedUpdateItemQuantity = _.wrap(CartDetailedView.prototype.debouncedUpdateItemQuantity, function (fn, e) {
					//debugger;
					this.updateItemQuantity(e);
					
				})

			

				CartDetailedView.prototype.initPlugins = _.wrap(CartDetailedView.prototype.initPlugins, function (fn, e) {
					//debugger;
					self = this
					if (this.application.Configuration.get('siteSettings.sitetype') === 'ADVANCED') {
						this.$('[data-action="sticky"]').scStickyButton();
						var element = jQuery('.modal-modal.fade.modal-ProductDetails.QuickView.View.in');
						
					}
					Utils.initBxSlider(
						this.$('[data-type="carousel-items"]'),
						this.application.Configuration.get('bxSliderDefaults')
					);
					
				})

				AddToCartButtonView.prototype.addToCart = _.wrap(AddToCartButtonView.prototype.addToCart, function (fn, e) { 
				//	debugger
					e.preventDefault();
					const self = this;
					let cart_promise;
					var validate = true;
					var itemId = this.model.get('item').id;
				
					if (
						!this.model.areAttributesValid(['options', 'quantity'], self.getAddToCartValidators())
					) {
						return;
					}
					var qtyVal = jQuery('#quantity').val() || jQuery('#in-modal-quantity').val()
					var newQty = (this.model.get('item').get('custitem_sales_qty_multiple') * parseInt(qtyVal))
					this.model.setOption('custcol_sdb_sca_qty_box',newQty.toString())
					this.model.setOption('custcol_sdb_sca_original_qty',jQuery('#quantity').val())
					

					if (!this.model.isNew() && this.model.get('source') === 'cart') {
						cart_promise = this.cart.updateProduct(this.model);
						cart_promise.done(function() {
							self.options.application.getLayout().closeModal();
						});
					} else {
						const line = LiveOrderLineModel.createFromProduct(this.model);
						cart_promise = this.cart.addLine(line);
						CartConfirmationHelpers.showCartConfirmation(
							cart_promise,
							line,
							self.options.application
						);
					}
					cart_promise.fail(function(jqXhr) {
						let error_details = null;
						try {
							const response = JSON.parse(jqXhr.responseText);
							error_details = response.errorDetails;
						} finally {
							if (error_details && error_details.status === 'LINE_ROLLBACK') {
								self.model.set('internalid', error_details.newLineId);
							}
						}
					});
					this.disableElementsOnPromise(cart_promise, e.target);
					return false;
				}) 
				var obj = {};
				obj['blur [name="quantity"]'] = 'updateBoxQty';
				obj['focusout [name="quantity"]'] = 'updateBoxQty';
				obj['focusin [name="quantity"]'] = 'updateBoxQty';

				ProductDetailsQuantityView.prototype.events = obj;
				ProductDetailsQuantityView.prototype.updateBoxQty = _.wrap(ProductDetailsQuantityView.prototype.updateBoxQty, function (fn, e) {
					
					var qty = this.$('[name="quantity"]').val();
					var qtyPerBox = this.model.attributes.item.attributes.custitem_sales_qty_multiple;
					var intId = this.model.attributes.item.id;
					if (qtyPerBox) {
						jQuery('#quantity_case'+intId).val(qtyPerBox * parseInt(qty));
						jQuery('#in-modal-quantity_case' + intId).val(qtyPerBox * parseInt(qty));
					} else {
						jQuery('#quantity_case'+intId).val(parseInt(qty) * 1);
						jQuery('#in-modal-quantity_case' + intId).val(parseInt(qty) * 1);
					}
				})

				CartDetailedView.prototype.removeItem = _.wrap(CartDetailedView.prototype.removeItem, function (fn, e) {
					//debugger;
					const self = this;
					const product = this.model.get('lines').get(this.$(e.target).data('internalid'));
					const remove_promise = this.model.removeLine(product);
					const internalid = product.get('internalid');

					this.isRemoving = true;
					this.disableElementsOnPromise(
						remove_promise,
						'article[id="' + internalid + '"] a, article[id="' + internalid + '"] button'
					);

					remove_promise.always(function () {
						self.isRemoving = false;
					});
					window.location.reload();
					return remove_promise;
				})

				//Section Cart
				QuickAddView.prototype.selectAll = _.wrap(QuickAddView.prototype.selectAll, function (fn, e) {
					
					this.$('[name="quantity"]').select();
					var qty = this.$('[name="quantity"]').val();
					if (this.model.attributes.selectedProduct) {

						var qtyPerBox = this.model.attributes.selectedProduct.attributes.item.attributes.custitem_sales_qty_multiple;
						if (qtyPerBox) {
							if (jQuery('#case-quantity')) jQuery('#case-quantity').val(qtyPerBox * parseInt(qty));
						} else {
							if (jQuery('#case-quantity')) jQuery('#case-quantity').val(parseInt(qty) * 1);
						}

					}
				})

				//Section Cart
				QuickAddView.prototype.saveForm = _.wrap(QuickAddView.prototype.saveForm, function (fn, e) {
			//		debugger;
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
					
				});

				QuickAddView.prototype.resetHandle = _.wrap(QuickAddView.prototype.resetHandle, function (fn, e) {
				
					this.$('[data-type="quick-add-reset"]').hide();
					if (jQuery('#case-quantity')) jQuery('#case-quantity').val('');
					this.itemsSearcherComponent.cleanSearch();

				});

				// var allItemsCart;
				// if (cart) {
				// 	layout.on('beforeShowContent', function () {
						
				// 		var dataItemCart = [];
				// 		cart.getLines().then(function (lines) {
				// 			if (lines.length) {
				// 				for (var x = 0; x < lines.length; x++) {
				// 					dataItemCart.push({
				// 						item: lines[x].internalid,
				// 						qtyBox: lines[x].item.extras.custitem_sales_qty_multiple
				// 					})
				// 					console.log('lines', lines[x].item.extras.custitem_sales_qty_multiple)
				// 				}
				// 				allItemsCart = dataItemCart;
				// 				console.log('lines2', JSON.stringify(allItemsCart))
				// 			}
				// 		});
				// 	})

				// 	layout.on('afterShowContent', function () {
				// 		//;
				// 		if (allItemsCart && allItemsCart.length) {

				// 			for (var y = 0; y < allItemsCart.length; y++) {
				// 				var element = jQuery('[data-type="cart-item-quantity-input"]');
	
				// 				if (element[y]) var itemElement = element[y].id.split('item')[1].split('set')[0];
				// 				if (allItemsCart && allItemsCart.length) var itemElementCart = allItemsCart[y].item.split('item')[1].split('set')[0];
	
				// 				if (itemElement == itemElementCart) {
	
				// 					if (allItemsCart[y].qtyBox) {
				// 						if (jQuery('#case-quantity-' + itemElement)) jQuery('#case-quantity-' + itemElement).val(allItemsCart[y].qtyBox * parseInt(element[y].value))
				// 						jQuery('#in-modal-quantity_case' + itemElement).val(allItemsCart[y].qtyBox * parseInt(element[y].value));
				// 					} else {
				// 						if (jQuery('#case-quantity-' + itemElement)) jQuery('#case-quantity-' + itemElement).val(parseInt(element[y].value) * 1);
				// 						jQuery('#in-modal-quantity_case' + itemElement).val(allItemsCart[y].qtyBox * parseInt(element[y].value));
				// 					}
	
	
				// 				}
	
				// 			}

				// 		}


				// 	})
				// }

				//Set QTY Item page

				if (pdp) {
				//	debugger;
					layout.on('afterShowContent', function () {
						console.log(this)
						var iteminfo = pdp.getItemInfo();

						if (iteminfo) {
							var qtyBox = iteminfo.item.custitem_sales_qty_multiple;
							var itemId=iteminfo.item.internalid;
							var element = jQuery('[name="quantity"]');
							if (qtyBox) {
								jQuery('#quantity_case'+itemId).val(qtyBox * parseInt(element[0].value))
							} else {
								jQuery('#quantity_case'+itemId).val(parseInt(element[0].value) * 1)
							}


						}

					})
				}



				ProductDetailsQuantityView.prototype.setFocus = _.wrap(ProductDetailsQuantityView.prototype.setFocus, function (fn, e) {
				//	debugger;
					this.$('[name="quantity"]').focus();
					var qty = this.$('[name="quantity"]').val();
					var qtyPerBox = this.model.attributes.item.attributes.custitem_sales_qty_multiple;
					var intId = this.model.attributes.item.id;
					if (qtyPerBox) {
						jQuery('#quantity_case'+intId).val(qtyPerBox * parseInt(qty));
						jQuery('#in-modal-quantity_case' + intId).val(qtyPerBox * parseInt(qty));
					} else {
						jQuery('#quantity_case'+intId).val(parseInt(qty) * 1);
						jQuery('#in-modal-quantity_case' + intId).val(parseInt(qty) * 1);
					}



				});
				// ProductDetailsQuantityView.prototype.initialize= _.wrap(ProductDetailsQuantityView.prototype.initialize, function (fn, e) {
				CartItemSummaryView.prototype.addQuantity = _.wrap(ProductDetailsQuantityView.prototype.addQuantity, function (fn, e) {
				//	debugger;
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
				CartDetailView.prototype.debouncedUpdateItemQuantity = _.wrap(CartDetailView.prototype.debouncedUpdateItemQuantity, function (fn, e) { 
					e.preventDefault();
					
					const $form = jQuery(e.target).closest('form');
					const $input = $form.find('[name="quantity"]');
					const options = $form.serializeObject();
					var  internalid  = options;
					let line = this.model.get('lines').get(internalid);
					var qty = parseInt(options.quantity);
					var qtyPerBox = line.get('item').get('custitem_sales_qty_multiple')
					var validate = true;
					var itemId = line.get('item').id;
					var optionsItem = line.get('options').models;
					_.each(optionsItem,function(model){
						if(model.get('cartOptionId')=== "custcol_sdb_sca_qty_box"){
							model.set('value',{internalid:(qtyPerBox*qty).toString(),label:(qtyPerBox*qty).toString()})
						}
					})
					this.updateItemQuantity(e);
				})

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
