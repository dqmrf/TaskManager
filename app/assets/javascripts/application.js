// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require bootstrap
//= require bootstrap-sprockets
//= require moment
//= require bootstrap-datetimepicker
var Application = (function($, window, document, undefined) {

  var forEach = Array.prototype.forEach,
      slice = Array.prototype.slice;

  var app = {

    init: function() {
      this.batchDeletion();
      // this.sortingByFields();
    },

    batchDeletion: function() {
      var form = document.getElementsByClassName('batch-del-form')[0],
          buttonSubmit, checkboxes;

      if (form == undefined) return;

      buttonSubmit = form.getElementsByClassName('batch-del-submit')[0];
      checkboxes = form.getElementsByClassName('batch-del-checkbox');

      form.addEventListener("click", toggleButtonSubmit);
      $(document).ajaxComplete(function(event, request) {
        buttonSubmit.classList.remove("active");
      });

      function toggleButtonSubmit(e) {
        var target = e.target, checkedOne;

        while (target != this) {
          if (target.classList.contains('batch-del')) {
            if (target.classList.contains('batch-del-checkall')) {
              for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = target.dataset.checkall == "true";
              }
            }

            checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);

            if (checkedOne) {
              buttonSubmit.classList.add('active');
            } else {
              buttonSubmit.classList.remove('active');
            }
            return;
          }
          target = target.parentNode;
        }
      }
    },

    // sortingByFields: function() {
    //   var containers = document.getElementsByClassName('sort-container')

    //   if (containers.length == 0) return;

    //   document.addEventListener("click", checkIfSortBtn);

    //   function checkIfSortBtn(e) {
    //     var target = e.target;

    //     while (target != document) {
    //       if (target.classList.contains('sort-by')) {
    //         sort(target);
    //         return;
    //       }
    //       target = target.parentNode;
    //     }
    //   }

    //   function sort(button) {
    //     var sortFieldClass = 'sort-field_' + button.dataset.sortField;

    //     forEach.call(containers, function(container, i) {
    //       var sortElementsArr = [];

    //       forEach.call(container.getElementsByClassName('sort-element'), function(sortElement, i) {
    //           if (sortElement.nodeType == 1) {
    //             sortElementsArr.push(sortElement);
    //           }
    //       });

    //       sortElementsArr.sort(function(a, b){
    //         var fieldA = a.getElementsByClassName(sortFieldClass)[0],
    //             fieldB = b.getElementsByClassName(sortFieldClass)[0];

    //         if (!(fieldA || fieldB)) return;

    //         return fieldA.textContent.toLowerCase().localeCompare(fieldB.textContent.toLowerCase());
    //       });

    //       sortElementsArr.forEach(function(sortElement, i){
    //         container.appendChild(sortElement);
    //       });
    //     });
    //   }
    // }
  };

  return app;
}(window.Zepto || window.jQuery, window, document));

// Application object initialization.
$(document).on("turbolinks:load", function(){
  Application.init();
});