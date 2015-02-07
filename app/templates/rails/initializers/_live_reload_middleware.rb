<%= appName %>::Application.configure do
  config.middleware.delete Rack::Lock
  config.middleware.use Rack::LiveReload
end
