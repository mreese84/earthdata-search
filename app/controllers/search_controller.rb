class SearchController < ApplicationController

  before_filter :set_env_session

  respond_to :json

  def extract_filters
    is_immediate_reentered = (params.delete :rerun) == 'true'
    previous_keyword = params.delete :previous_q
    metrics_event('immediate-reenter', {keyword: params[:q], previous_keyword: previous_keyword}) if is_immediate_reentered
    respond_with TextSearchClient.parse_text(params[:q])
  end

  def log_metrics_event
    if params[:other_data] && params[:other_data] != "" then
      metrics_event(params[:type], params[:data], eval(params[:other_data])) 
    else 
      metrics_event(params[:type], params[:data])
    end
    render nothing: true, status: :ok, content_type: "text/html"
  end
end
