require 'rails_helper'

RSpec.describe User, type: :model do
  let (:subject) { User.new }

  it { expect(subject).to validate_presence_of(:email) }
end
