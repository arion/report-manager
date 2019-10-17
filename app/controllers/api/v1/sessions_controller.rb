class Api::V1::SessionsController < Api::V1::ApplicationController
  skip_before_action :authenticate!

  def create
    user = User.find_by(email: params[:email].downcase)

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id.to_s
      respond_with user, location: nil
    else
      render json: { error: 'Incorrect email or password, try again' }, status: 402
    end
  end

  def destroy
    session.delete(:user_id)
    render json: {}, status: 200
  end
end
