class Report < ApplicationRecord
  FORMATS = %w(pdf tiff png txt)

  belongs_to :author, class_name: 'User'

  validates :author, presence: true
  validates :file, presence: true
  validates :title, uniqueness: true, length: { minimum: 3, maximum: 10 }

  mount_uploader :file, ReportUploader
end
