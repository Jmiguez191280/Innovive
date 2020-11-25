function updateQty(type) {
    var newRecord = nlapiGetNewRecord();
    var rcd = newRecord.getRecordType();
    var lines = nlapiGetLineItemCount('item');
    nlapiLogExecution('DEBUG', 'Type', type);
    nlapiLogExecution('DEBUG', 'rcd', rcd);
    for (var i = 1; i <= lines; i++) {
        nlapiSelectLineItem('item', i);
        var realQty = parseInt(nlapiGetCurrentLineItemValue('item', 'custcol_sdb_sca_qty_box'));
        nlapiLogExecution('DEBUG', 'DEBUG realQty realQty', realQty);
        if (!isNaN(realQty)) {
            nlapiSetCurrentLineItemValue('item', 'quantity', realQty, true, true);
            nlapiCommitLineItem('item');

        }
    }

    if (type == 'create' && rcd == 'estimate') {
    
        //var lines = nlapiGetLineItemCount('item');
        
        for (var i = 1; i <= lines; i++) {
            nlapiSelectLineItem('item', i);
            var qty = parseInt(nlapiGetCurrentLineItemValue('item', 'quantity'));
            var itemId = nlapiGetCurrentLineItemValue('item', 'item');
            var qtyPerBox = parseInt(nlapiLookupField('item', itemId, 'custitem_sales_qty_multiple'));
            nlapiLogExecution('DEBUG', 'itemId', itemId);
            nlapiLogExecution('DEBUG', 'qtyPerBox', qtyPerBox);
            nlapiLogExecution('DEBUG', 'qty rcd', qty);

            if (!isNaN(qtyPerBox)) {
                nlapiSetCurrentLineItemValue('item', 'quantity', qty * qtyPerBox, true, true);
                nlapiCommitLineItem('item');
            }
        }
        nlapiLogExecution('DEBUG', 'DEBUG rcd', rcd);

    }
}

// var price = parseFloat(nlapiGetCurrentLineItemValue( 'item', 'rate'))
//nlapiSetCurrentLineItemValue( 'item', 'amount', (price*realQty), true, true );