class Api::V1::ApplicationController < ::ApplicationController
  skip_before_action :verify_authenticity_token

  layout false

  respond_to :json
end
