define("Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile", [
  "Devma.InnoviveUploadPdfFile.InnoviveUploadPdfFile.View",
  "OrderWizard.Module.Shipmethod",
  "OrderWizard.Module.Title",
  "Wizard.View",
], function (
  InnoviveUploadPdfFileView,
  OrderWizardModuleShipmethod,
  OrderWizardModuleTitle,
  WizardView
) {
  "use strict";

  return {
    mountToApp: function mountToApp(container) {
      // using the 'Layout' component we add a new child view inside the 'Header' existing view
      // (there will be a DOM element with the HTML attribute data-view="Header.Logo")
      // more documentation of the Extensibility API in
      // https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

      /** @type {LayoutComponent} */
      var layout = container.getComponent("Layout");

      if (layout) {
        layout.addChildView('uploadFileView', function () {
          return new InnoviveUploadPdfFileView({ container: container });
        });
      }

      if (layout) {
        WizardView.prototype.submit = _.wrap(
          WizardView.prototype.submit,
          function (fn, e) {
            if (jQuery("#file_id_pdf").val())
              this.model.attributes.options.custbody_file_id_pdf = jQuery(
                "#file_id_pdf"
              ).val();
            this.wizard.getCurrentStep().submit(e);
          }
        );

        // OrderWizardModuleTitle.prototype.template = _.wrap(
        //   OrderWizardModuleTitle.prototype.template,
        //   function (fn) {
        //     var addToTemplate =
        //       '<input hidden style="height: 33px;left: 32px;top: -66px;position: relative;" id="file_id_pdf"></input><button style="height: 29px;left: 32px;top: -69px;position: relative;background-color:rgb(21, 96, 123)!important;color:white!important;border: 1px solid rgb(21, 96, 123)!important;"  type="button" class="order-wizard-paymentmethod-selector-module-button selected" data-toggle="modal" data-target="#fileModal">Attach File</button><span style="margin:10px;font-size:20px;color:rgb(21, 96, 123);height: 33px;left: 32px;top: -66px;position: relative;" id="nameFile"></span>';
        //     addToTemplate +=
        //       '<div  class="modal fade" id="fileModal" tabindex="-1" role="dialog" aria-labelledby="mdalLabel" aria-hidden="true">';
        //     addToTemplate +=
        //       '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body">';
        //     addToTemplate +=
        //       '<iframe height="150px" width="100%" id="my_iframe_tax" frameBorder="0" scrolling="no" src="/app/site/hosting/scriptlet.nl?script=customscript_devma_upload_file&deploy=customdeploy_devma_upload_file_dpy&compid=668237_SB1&h=e24409ecea05bcfb4326"></iframe></div>';
        //     addToTemplate +=
        //       '<div class="modal-footer"><button id="btn_attanch" onclick="window.frames[0].submitForm()" style="background-color:rgb(21, 96, 123)!important;color:white!important;border: 1px solid rgb(21, 96, 123)!important;" type="button" class="order-wizard-paymentmethod-selector-module-button selected" disabled="disabled">Attach</button>';
        //     addToTemplate +=
        //       '<button id="btn_remove" onclick="window.frames[0].submitForm()" type="button" style="margin:10px;background-color:grey;color:white!important;border: 1px solid rgb(21, 96, 123)!important;" class="order-wizard-paymentmethod-selector-module-button selected" disabled="disabled" >Remove</button>';
        //     addToTemplate +=
        //     '<button  type="button" style="background-color:rgb(21, 96, 123)!important;color:white!important;border: 1px solid rgb(21, 96, 123)!important;" class="order-wizard-paymentmethod-selector-module-button selected" data-dismiss="modal">Close</button>';
        //     addToTemplate += "</div></div></div></div>";
        //     var templateHTML = fn.apply(this, _.toArray(arguments).slice(1));
        //     if (
        //       location.href.indexOf("/checkout") != -1 &&
        //       templateHTML.indexOf("Payment") != -1
        //     ) {
        //       var resultHtml = addToTemplate + templateHTML;
        //       return resultHtml;
        //     }
        //     return templateHTML;
        //   }
        // );
      }
    },
  };
});
