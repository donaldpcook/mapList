class Location < ActiveRecord::Base
  belongs_to :user
  attr_accessible :lat, :lng, :name, :user_id
end
