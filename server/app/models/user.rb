class User < ActiveRecord::Base
    
  has_many :memes

  # Encrypt password using bcrypt gem
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  # Authenticate user with encrypted password
  def authenticate(password)
    BCrypt::Password.new(password_digest) == password
  end

end
