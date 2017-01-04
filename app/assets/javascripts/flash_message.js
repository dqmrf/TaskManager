;(function() {
  $(document).ajaxComplete(function(event, request) {
    var msg = request.getResponseHeader("X-Message"),
        type = request.getResponseHeader("X-Message-Type");

    return showAjaxMessage(msg, type);
  });

  function showAjaxMessage(msg, type) {
    if (type === "notice") {
      type = "success";
    }
    if (type === "alert") {
      type = "danger";
    }

    if ($("#flash-messages").length === 0) {
      $("#page-content").prepend('<div id="flash-messages"></div>');
    } else {
      $('#flash-messages').find('alert.alert-noajax').each(function() {
        $(this).remove();
      });
    }

    return $("#flash-messages").html("<div class='alert alert-" + type + "'>" + msg + "</div>");
  };
}).call(this);