require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'assosiations' do
    it { should have_many(:tasks) }
  end

  context 'validations' do
    subject { FactoryGirl.create(:user) }

    context 'valid' do
      it { should be_valid }
    end

    context 'invalid' do
      it { should validate_presence_of(:first_name) }
      it { should validate_presence_of(:first_name) }
      it { should validate_presence_of(:email) }
      it { should validate_uniqueness_of(:email) }
    end

    context '#full_name' do
      it "returns a user's full name as a string" do
        user = FactoryGirl.create(:user, first_name: "Misha", last_name: "Pelykh")
        user.full_name.should == "Misha Pelykh"
      end
    end
  end
end