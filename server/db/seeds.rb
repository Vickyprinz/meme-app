puts "Seeding messages..."

# Create users
User.create(username: 'JohnDoe', email: 'john@example.com', gender: 'male', age: 30, password: 'password123')
User.create(username: 'JaneDoe', email: 'jane@example.com', gender: 'female', age: 25, password: 'password456')

# Create memes associated with a user
john = User.find_by(username: 'JohnDoe')
jane = User.find_by(username: 'JaneDoe')

Meme.create(title: 'Funny Meme', comment: 'LOL', user_id: john.id)
Meme.create(title: 'Cute Meme', comment: 'Aww', user_id: jane.id)
Meme.create(title: 'Silly Meme', comment: 'Haha', user_id: john.id)

puts "Completed seeding!"
