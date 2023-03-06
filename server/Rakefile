require_relative "./config/environment"
require "sinatra/activerecord/rake"

desc "Start the server"
task :server => :environment do  
  ActiveRecord::Base.logger = Logger.new(STDOUT)

  # Migrate the database
  Rake::Task["db:migrate"].invoke

  # rackup -p PORT will run on the port specified (9292 by default)
  ENV["PORT"] ||= "9292"
  rackup = "rackup -p #{ENV['PORT']}"

  # rerun allows auto-reloading of server when files are updated
  # -b runs in the background (include it or binding.pry won't work)
  exec "bundle exec rerun -b '#{rackup}'"
end


desc "Start the console"
task :console do
  ActiveRecord::Base.logger = Logger.new(STDOUT)
  Pry.start
end