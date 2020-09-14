function uploader(request, response) {
    if (request.getMethod() == 'GET') {
        var form = nlapiCreateForm('Select  file to upload');


        // entity = request.getParameter("entity")
        // vid = request.getParameter("vid")
        var text = form.addField('custpage_text', 'inlinehtml')
        text.setDefaultValue("<script>function resetFile(){ var countInput=document.getElementById('main_form');if(countInput){for(var i=1;i<2;i++){document.getElementById('main_form')[i].value='';}}}function submitForm() { debugger; var submitter =document.getElementById('submitter');if (submitter) {submitter.click();}else{ document.getElementById('secondarysubmitter').click(); } }</script>")

        var _vid = form.addField('custpage_vid', 'inlinehtml')
        _vid.setDefaultValue('<style>#custpage_text_2_val,#custpage_text_val,.uir-page-title #myLink{font-family:Arial;color:#444;font-size:14px}.uir-page-title #myLink a{color:#00f}.uir-page-title #myLink{margin-top:4px}#tdbody_secondarysubmitter{display:block;}#custpage_text_2_val{display:inline-block;margin-top:50px}#tdbody_submitter{display:none!important}#div__header{display:none!important}#tdbody_submitter{background:#d71920!important;color:#fff;font-weight:700;border:none;border-radius:0;text-transform:none;display:inline-block}form#main_form table:nth-child(2) {position:absolute!important;bottom: 40px!important}#main_form #tdbody_submitter,.uir-button input[type=submit] {font-size: 15px;text-decoration: none;height: 35px!important;width: 75px!important;font-family: Arial, sans-serif!important;font-weight: 300;color: #fff;}</style><script>function resetFile(){ var countInput=document.getElementById("main_form");if(countInput){for(var i=1;i<2;i++){document.getElementById("main_form")[i].value="";}}}function submitForm() {debugger; var submitter = document.getElementById("submitter");if (submitter) {submitter.click();}else{  document.getElementById("secondarysubmitter").click(); } } jQuery(document).ready(function () {  var removeOnchenge = document.getElementsByClassName("input");if(removeOnchenge[0]){ removeOnchenge[0].setAttribute("onChange", "setInputFile();setWindowChanged(window, true);");}if(jQuery("#idfile_remove") && jQuery("#idfile_remove").val()){top.jQuery("#btn_remove").css({"background-color":"grey"});top.jQuery("#btn_remove").attr("disabled","disabled");}}); function setInputFile() { debugger; var value = document.getElementsByClassName("input"); if (jQuery("#errorExtension")[0]) jQuery("#errorExtension").empty(); if (value[0].value) { var position = value[0].value.split("\\\\").length - 1; var newValue = value[0].value.split("\\\\")[position].split(".")[1]; console.log(newValue); if (newValue  && jQuery("#idfile_remove") && jQuery("#idfile_remove").val() ) {jQuery("#errorExtension").html("Note that the file to be uploaded must not exceed 10 mb."); top.jQuery("#btn_remove").css({"background-color":"rgb(21, 96, 123"}); top.jQuery("#btn_remove").removeAttr("disabled");top.jQuery("#btn_attanch").removeAttr("disabled");}else if(newValue ){ jQuery("#errorExtension").html("Note that the file to be uploaded must not exceed 10 mb.");top.jQuery("#btn_attanch").removeAttr("disabled");}else{  debugger; jQuery("#errorExtension").html("Note that the file to be uploaded must not exceed 10 mb.");top.jQuery("#btn_remove").css({"background-color":"grey"}); top.jQuery("#btn_remove").attr("disabled","disabled");top.jQuery("#btn_attanch").attr("disabled","disabled");}}else{ top.jQuery("#btn_remove").css({"background-color":"grey"}); top.jQuery("#btn_remove").attr("disabled","disabled");}}</script>');

        var fileField_1 = form.addField('file_1', 'file', 'File  ');
        fileField_1.setLayoutType('outsideabove', 'startrow');
        var error = form.addField('error_pdf', 'inlinehtml');
        error.setLayoutType('outsideabove', 'startrow');
        error.setDefaultValue('<div style="font-size:15px;color:green;" id="errorExtension"></di>')


        var btn = form.addSubmitButton();
        response.writePage(form);

    } else {

        var pdfFiles = request.getFile("file_1");
        var fileToRemove = request.getParameter("idfile_remove");
       var successfully='';
        nlapiLogExecution("DEBUG", "fileToRemove", fileToRemove);
        var title='Select  file to upload';
        if(fileToRemove)title='Select  file to upload';
        var bigSize=false;
        var fileNameReturn='';
        var form = nlapiCreateForm(title);
        var text = form.addField('custpage_text', 'inlinehtml')
    
        var htmlField = form.addField('custpage_htmlfield', 'inlinehtml');
        htmlField.setLayoutType('midrow');
        var _vid = form.addField('custpage_vid_2', 'inlinehtml')
        _vid.setDefaultValue('<style>#custpage_text_2_val,#custpage_text_val,.uir-page-title #myLink{font-family:Arial;color:#444;font-size:14px}.uir-page-title #myLink a{color:#00f}.uir-page-title #myLink{margin-top:4px}#custpage_text_2_val{display:inline-block;margin-top:50px}#tdbody_submitter{display:none!important}#div__header{display:none!important}#tdbody_submitter{background:#d71920!important;color:#fff;font-weight:700;border:none;border-radius:0;text-transform:none;display:inline-block}form#main_form table:nth-child(2) {position: absolute!important;bottom: 40px!important}#main_form #tdbody_submitter,.uir-button input[type=submit] {font-size: 15px;text-decoration: none;height: 35px!important;width: 75px!important;font-family: Arial, sans-serif!important;font-weight: 300;color: #fff;}</style><script>function resetFile(){ var countInput=document.getElementById("main_form");if(countInput){for(var i=1;i<2;i++){document.getElementById("main_form")[i].value="";}}}function submitForm() {debugger; var submitter = document.getElementById("submitter");if (submitter) {submitter.click();}else{  document.getElementById("secondarysubmitter").click(); } } jQuery(document).ready(function () { top.jQuery("#btn_attanch").attr("disabled","disabled"); var removeOnchenge = document.getElementsByClassName("input");if(removeOnchenge[0]){ removeOnchenge[0].setAttribute("onChange", "setInputFile();setWindowChanged(window, true);");} if(jQuery("#idfile_remove") && jQuery("#idfile_remove").val()){console.log("file2",jQuery("#idfile_remove").val());  top.jQuery("#btn_remove").css({"background-color":"rgb(21, 96, 123"}); top.jQuery("#btn_remove").removeAttr("disabled");}else{ top.jQuery("#btn_remove").css({"background-color":"grey"}); top.jQuery("#btn_remove").attr("disabled","disabled");}    }); function setInputFile() { debugger; var value = document.getElementsByClassName("input"); if (jQuery("#errorExtension")[0]) jQuery("#errorExtension").empty(); if (value[0].value) { var position = value[0].value.split("\\\\").length - 1; var newValue = value[0].value.split("\\\\")[position].split(".")[1]; console.log(newValue); if (newValue  && jQuery("#idfile_remove") && jQuery("#idfile_remove").val() ) { jQuery("#errorExtension").html("Note that the file to be uploaded must not exceed 10 mb."); top.jQuery("#btn_remove").css({"background-color":"rgb(21, 96, 123"}); top.jQuery("#btn_remove").removeAttr("disabled");top.jQuery("#btn_attanch").removeAttr("disabled");}else if(newValue ){ jQuery("#errorExtension").html("Note that the file to be uploaded must not exceed 10 mb."); top.jQuery("#btn_attanch").removeAttr("disabled");}else{  debugger; top.jQuery("#btn_remove").css({"background-color":"grey"}); top.jQuery("#btn_remove").attr("disabled","disabled");top.jQuery("#btn_attanch").attr("disabled","disabled");}}else{ top.jQuery("#btn_remove").css({"background-color":"grey"}); top.jQuery("#btn_remove").attr("disabled","disabled");}}</script>');
        var msgField = form.addField('custpage_html_text', 'inlinehtml');
        msgField.setLayoutType('outsideabove', 'startrow');
        if (fileToRemove) {
            nlapiDeleteFile(fileToRemove);
            var fileField_1 = form.addField('file_1', 'file', 'File  ');
            fileField_1.setLayoutType('outsideabove', 'startrow');
            msgField.setDefaultValue('<script>top.jQuery("#nameFile").empty();</script>')
            var error = form.addField('error_pdf', 'inlinehtml');
            error.setLayoutType('outsideabove', 'startrow');
            error.setDefaultValue('<div style="font-size:15px;color:green;" id="errorExtension"></di>')
        } else {

            var idFile = '';
            var fileName = '';
            if (pdfFiles) {
                pdfFiles.setFolder(62218);
                var size=pdfFiles.getSize();
                fileName=pdfFiles.getName()
                nlapiLogExecution("DEBUG", "size2", size);
                nlapiLogExecution("DEBUG", "fileName", fileName);
                if(size <= 10000000){
                    idFile = nlapiSubmitFile(pdfFiles);
                    var f = nlapiLoadFile(idFile);
                    fileName = f.getName();     
                }else{
                    bigSize=true;
                }
                
                nlapiLogExecution("DEBUG", "idFile", idFile);

            }
            var htmlInstruct = form.addField('idfile_remove', 'text');
            htmlInstruct.setDefaultValue(idFile);
            htmlInstruct.setDisplayType('hidden');
            var printhtml = '';
            if(idFile)  {
                msgField.setDefaultValue('<p style="font-size:20px;color:green;">The file ' + fileName + ' was successfully saved.</p>');
                fileNameReturn=fileName;
            }else if(bigSize){
                msgField.setDefaultValue('<p style="font-size:20px;color:red;">The file '+ fileName +' will not be saved because it exceeds 10mb.</p>');
                var fileField_1 = form.addField('file_1', 'file', 'File  ');
                fileField_1.setLayoutType('outsideabove', 'startrow');         
               }else  {
                    var fileField_1 = form.addField('file_1', 'file', 'File  ');
                   fileField_1.setLayoutType('outsideabove', 'startrow');
               }
           
            htmlField.setDefaultValue('<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr><td><div class="uir-page-title"><div id="myLink"><a href="#""></a><span></span></div></div></td></tr></tbody></table><style>#tdbody_secondarysubmitter{display:block;}</style><script> top.jQuery("#exampleModal").modal("toggle"); debugger;   top.jQuery("#table_files").append(\'' + printhtml + '\'); top.jQuery("#file_id_pdf").val(\'' + idFile + '\'); top.jQuery("#nameFile").html(\'' + fileNameReturn + '\');</script>');
        }

        form.addSubmitButton();
        response.writePage(form);
    }


}