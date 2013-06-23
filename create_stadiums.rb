require 'csv'
require 'httparty'
require 'json'

HTTParty.post("http://localhost:7474/db/data/ext/SpatialPlugin/graphdb/addSimplePointLayer", 
  :body => { :layer => 'geom', :lat => 'lat', :lon => 'lon' }.to_json,
  :headers => { 'Content-Type' => 'application/json' } )

HTTParty.post("http://localhost:7474/db/data/index/node", 		
  :body => { :name => 'geom', :config => { :provider => 'spatial', :geometry_type => 'point', :lat => 'lat', :lon => 'lon' } }.to_json,
  :headers => { 'Content-Type' => 'application/json' } )

stadiums = File.join(File.dirname(__FILE__), 'data', 'stadiums.csv')
contents = CSV.read(stadiums)
contents.shift
contents.each do |row|
  name, team, capacity, lat, long = row

	node_id = HTTParty.post("http://localhost:7474/db/data/node", 		
    :body => { :lat => lat.to_f, :lon => long.to_f, :name => name, :team => team, :capacity => capacity }.to_json,
    :headers => { 'Content-Type' => 'application/json' } )['self'].split("/")[-1]

	HTTParty.post("http://localhost:7474/db/data/index/node/geom", 		
	  :body => { :key => 'dummy', :value => 'dummy', :uri => "http://localhost:7474/db/data/node/#{node_id}"}.to_json,
	  :headers => { 'Content-Type' => 'application/json' } )
end