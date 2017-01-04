class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_filter :flash_to_headers

  protected

    def flash_to_headers
      return unless request.xhr?
      response.headers['X-Message'] = flash_message
      response.headers["X-Message-Type"] = flash_type.to_s

      flash.discard
    end

    def flash_message
      [:danger, :warning, :info, :success].each do |type|
        return flash[type] unless flash[type].blank?
      end
    end

    def flash_type
      [:danger, :warning, :info, :success].each do |type|
        return type unless flash[type].blank?
      end
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
    end

    def render_404
      render file: "#{Rails.root}/public/404.html", layout: false, status: 404
    end
end