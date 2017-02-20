class Task < ActiveRecord::Base
  belongs_to :user
  
  validates :title, presence: true,
                    length: { minimum: 3 }
  validates :priority, numericality: { only_integer: true }
  validate :due_date_cannot_be_in_the_past

  private
    def due_date_cannot_be_in_the_past
      if due_date.present? && due_date < Date.today
        errors.add(:due_date, "Due date can't be in the past")
      end
    end
end