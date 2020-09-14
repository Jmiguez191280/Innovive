{{!
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

{{! Edited for Bridge Theme }}
<!--aja-->
{{#if isPriceEnabled}}
<div class="cart-item-summary-item-list-actionable-qty">
	<form action="#" class="cart-item-summary-item-list-actionable-qty-form" data-action="update-quantity" data-validation="control-group">
		<input type="hidden" name="internalid" id="update-internalid-{{lineId}}" class="update-internalid-{{lineId}}" value="{{lineId}}">
		<label for="quantity-{{lineId}}" data-validation="control">
			{{#if showQuantity}}
				<input type="hidden" name="quantity" id="quantity-{{lineId}}" value="1">
			{{else}}
				<div class="cart-item-summary-item-list-actionable-container-qty">
				<label class="cart-item-summary-item-list-actionable-label-qty">{{translate ' Quantity:'}}</label>
                <input disabled type="text" id="case-quantity-{{lineId}}" class="cart-item-summary-quantity-value quantity-{{lineId}}" value="" min=""/>
					
					<label class="cart-item-summary-item-list-actionable-label-qty">{{translate 'Case Quantity'}}*</label>
					<div class="cart-item-summary-item-list-actionable-input-qty">
							<button type="button" class="cart-item-summary-quantity-remove" data-action="minus" {{#if isMinusButtonDisabled}}disabled{{/if}}>-</button>
							<input type="number" data-type="cart-item-quantity-input" name="quantity" id="quantity-{{lineId}}" class="cart-item-summary-quantity-value quantity-{{lineId}}" value="{{line.quantity}}" min="1"/>
							<!--
							<input type="number" data-type="cart-item-custcol_devma_line_box_quantity-input" name="custcol_devma_line_box_quantity" id="custcol_devma_line_box_quantity-{{lineId}}" class="cart-item-summary-quantity-value custcol_devma_line_box_quantity-{{lineId}}" value="{{line.custcol_devma_line_box_quantity}}" min="1"/>
							-->
							<button type="button" class="cart-item-summary-quantity-add" data-action="plus" {{#if isPlusButtonDisabled}}disabled{{/if}}>+</button>
					</div>
					{{#if showMinimumQuantity}}
						<small class="cart-item-summary-quantity-title-help">
							{{translate 'Minimum of $(0) required' minimumQuantity}}
						</small>
					{{/if}}
					{{#if showMaximumQuantity}}
						<small class="cart-item-summary-quantity-title-help">
							{{translate 'Maximum of $(0) required' maximumQuantity}}
						</small>
					{{/if}}
				</div>
			{{/if}}
			<div data-type="alert-placeholder"></div>
		</label>
	</form>
</div>

<div data-view="Quantity.Pricing"></div>

<div class="cart-item-summary-item-list-actionable-amount">
	<span class="cart-item-summary-item-list-actionable-amount-label">{{translate 'Amount: ' }}</span>
	<span class="cart-item-summary-amount-value">{{ line.total_formatted }}</span>
	{{#if showComparePrice}}
		<small class="muted cart-item-summary-item-view-old-price">{{ line.amount_formatted}}</small>
	{{/if}}
</div>

<div data-view="PromocodeList" class="cart-item-summary-promocodes"></div>
{{/if}}




{{!----
Use the following context variables when customizing this template: 
	
	line (Object)
	line.item (Object)
	line.item.internalid (Number)
	line.item.type (String)
	line.quantity (Number)
	line.internalid (String)
	line.options (Array)
	line.location (String)
	line.fulfillmentChoice (String)
	lineId (String)
	isMinusButtonDisabled (Boolean)
	showQuantity (Boolean)
	showComparePrice (Boolean)
	showMinimumQuantity (Boolean)
	minimumQuantity (Number)
	isPriceEnabled (Boolean)

----}}