require "rails_helper"

describe Snippet do
  let(:subject) { Snippet.new }

  it { expect(subject).to validate_presence_of(:title) }
  it { expect(subject).to validate_presence_of(:content) }
  it { expect(subject).to validate_presence_of(:creator) }
end
