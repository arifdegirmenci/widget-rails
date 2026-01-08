class Feedback < ApplicationRecord
  belongs_to :project

  validates :content, presence: true
  validates :rating, inclusion: { in: 1..5 }, allow_nil: true
end
