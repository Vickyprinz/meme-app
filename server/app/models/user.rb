class User < ActiveRecord::Base
    has_secure_password
  
    validates :username, :email, presence: true
    validates :username, :email, uniqueness: true
  
    has_many :memes
  
    # Encrypt password using bcrypt gem
    def password=(password)
      self.password_digest = BCrypt::Password.create(password)
    end
  
    # Authenticate user with the encrypted password
    def authenticate(password)
      BCrypt::Password.new(password_digest) == password
    end
  end
  