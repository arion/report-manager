class ApplicationController < ActionController::Base

  before_action :authenticate!

  def authenticate!
    render status: 401, json: { error: 'Forbidden' } unless current_user
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

end
