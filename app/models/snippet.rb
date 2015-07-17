class Snippet
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :title, type: String
  field :content, type: String
  field :language, type: String

  validates :title, presence: true
  validates :content, presence: true
  validates :language, presence: false
end
