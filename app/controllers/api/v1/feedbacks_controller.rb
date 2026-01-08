module Api
  module V1
    class FeedbacksController < BaseController
      def create
        project = Project.find_by!(uuid: params[:project_uuid])

        feedback = project.feedbacks.create!(
          content: params[:content],
          rating: params[:rating],
          sender_info: params[:sender_info]
        )

        render json: { success: true, id: feedback.id }, status: :created
      end
    end
  end
end
