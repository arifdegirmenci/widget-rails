class Project < ApplicationRecord
  has_many :feedbacks, dependent: :destroy

  before_validation :generate_uuid, on: :create

  validates :name, presence: true
  validates :uuid, presence: true, uniqueness: true

  private

  def generate_uuid
    self.uuid ||= SecureRandom.uuid
  end
end
