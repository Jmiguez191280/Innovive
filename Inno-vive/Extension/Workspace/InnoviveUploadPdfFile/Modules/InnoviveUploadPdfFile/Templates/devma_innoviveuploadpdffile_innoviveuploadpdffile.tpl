<!--<section class="innoviveuploadpdffile-info-card">
    <span class="innoviveuploadpdffile-info-card-content">
      {{message}}
    </span>
</section>-->

<input hidden style="height: 33px;left: 32px;top: -66px;position: relative;" id="file_id_pdf"></input><button
    style="height: 35px;left: 318px;top: -50px;position: relative;background-color:rgb(21, 96, 123)!important;color:white!important;border: 1px solid rgb(21, 96, 123)!important;"
    type="button" class="order-wizard-paymentmethod-selector-module-button selected" data-toggle="modal"
    data-target="#fileModal">Attach File</button><span
    style="margin:10px;font-size:20px;color:rgb(21, 96, 123);height: 33px;left: 313px;top: -46px;position: relative;"
    id="nameFile"></span>

<div class="modal fade" id="fileModal" tabindex="-1" role="dialog" aria-labelledby="mdalLabel" aria-hidden="true">

    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">

                <iframe height="150px" width="100%" id="my_iframe_tax" frameBorder="0" scrolling="no"
                    src="/app/site/hosting/scriptlet.nl?script=customscript_devma_upload_file&deploy=customdeploy_devma_upload_file_dpy&compid=668237_SB1&h=e24409ecea05bcfb4326"></iframe>
            </div>

            <div class="modal-footer"><button id="btn_attanch" onclick="window.frames[0].submitForm()"
                    style="background-color:rgb(21, 96, 123)!important;color:white!important;border: 1px solid rgb(21, 96, 123)!important;"
                    type="button" class="order-wizard-paymentmethod-selector-module-button selected"
                    disabled="disabled">Attach</button>

                <button id="btn_remove" onclick="window.frames[0].submitForm()" type="button"
                    style="margin:10px;background-color:grey;color:white!important;border: 1px solid rgb(21, 96, 123)!important;"
                    class="order-wizard-paymentmethod-selector-module-button selected"
                    disabled="disabled">Remove</button>

                <button type="button"
                    style="background-color:rgb(21, 96, 123)!important;color:white!important;border: 1px solid rgb(21, 96, 123)!important;"
                    class="order-wizard-paymentmethod-selector-module-button selected"
                    data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->