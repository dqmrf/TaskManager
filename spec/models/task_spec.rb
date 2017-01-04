require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'assosiations' do
    it { should belong_to(:user) }
  end

  context 'validations' do
    subject { FactoryGirl.create(:task) }

    context 'valid' do
      it { should be_valid }
    end

    context 'invalid' do
      it { should validate_presence_of(:title) }
      it { should validate_length_of(:title).is_at_least(3) }
    end
  end
end