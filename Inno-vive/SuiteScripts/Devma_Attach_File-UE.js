function afterSubmit(type) {
    try{
    if (type == 'create') {
    
        var fleId = nlapiGetFieldValue('custbody_file_id_pdf');
        var orderId = nlapiGetFieldValue('id');
      nlapiLogExecution("DEBUG", 'fleId', fleId);
            nlapiLogExecution("DEBUG", 'orderId', orderId);
        //add fields to the sublist
     if(fleId && orderId){
        nlapiAttachRecord("file", fleId, "salesorder", orderId);
     }
       
    }
}catch(e){
    nlapiLogExecution("DEBUG", 'Error', e);
}
}