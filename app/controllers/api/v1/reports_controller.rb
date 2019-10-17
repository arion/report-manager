class Api::V1::ReportsController < Api::V1::ApplicationController
  def index
    respond_with collection
  end

  def create
    @resource = Report.new(permitted_params)
    resource.author = current_user
    resource.save
    respond_with resource, location: nil
  end

  def update
    resource.update(permitted_params)
    respond_with Report, json: resource
  end

  def destroy
    respond_with resource.destroy
  end

  private

  def collection
    @collection ||= Report.order(:position).page(params[:page]).per(5)
  end

  def permitted_params
    params.require(:report).permit(:title, :description, :file)
  end

  def resource
    @resource ||= Report.find(params[:id])
  end

end
