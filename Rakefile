require 'rake/notes/rake_task'
require 'jshintrb/jshinttask'
require 'jasmine'

load 'jasmine/tasks/jasmine.rake'

Jshintrb::JshintTask.new :jshint do |t|
  t.pattern = 'source/javascripts/**/*.js'
  t.options = :jshintrc
end
