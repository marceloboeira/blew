require 'rails_helper'

RSpec.describe Snippet, type: :model do
  let (:subject) { Snippet.new }

  it { expect(subject).to validate_presence_of(:title) }
  it { expect(subject).to validate_presence_of(:content) }

end
