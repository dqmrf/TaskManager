module ApplicationHelper
  def admin?
    current_user && current_user.admin?
  end

  def flash_message(type, message)
    flash[type] ||= []
    flash[type] << message
  end

  def render_flash
    res = []

    devise_messages

    flash.each do |type, messages|
      type = "danger" if type == "alert"
      type = "success" if type == "notice"

      if !messages.empty?
        if messages.kind_of?(Array)
          res = messages.map { |message| get_flash_message(type, message) }.join
        else
          res = get_flash_message(type, messages)
        end
      end
    end

    flash.discard

    if !res.empty?
      html = <<-HTML
      <div id="flash-messages">
        #{res.html_safe}
      </div>
      HTML

      html.html_safe
    end
  end

  def get_flash_message(type, message)
    content_tag(:div, message, class: "alert alert-#{type} alert-noajax")
  end
end