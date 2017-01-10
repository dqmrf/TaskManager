module DeviseHelper
  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def devise_error_messages!
    return "" unless devise_error_messages?

    resource.errors.full_messages.each do |message|
      flash_message :danger, message
    end
  end

  def devise_error_messages?
    !resource.errors.empty?
  end

  def devise_messages
    devise_error_messages!
  end
end