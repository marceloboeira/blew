require "rails_helper"

describe User do
  let(:subject) { User.new }

  it { expect(subject).to validate_presence_of(:email) }
end
