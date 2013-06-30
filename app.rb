require 'sinatra'
require 'neography'
require File.join(File.dirname(__FILE__), 'haversine.rb')

def neo_client
	@neo ||= Neography::Rest.new
end

get '/' do	
	haml :index, :format => :html5
end

get '/stadiums/:lat/:long/:distance' do	
	lat, long, distance = params[:lat].to_f, params[:long].to_f, params[:distance].to_f

	query =  " START node = node:geom('withinDistance:[#{lat}, #{long}, #{distance}]')"
	query << " RETURN node.name, node.team, node.lat, node.lon"

	p query

	result = neo_client.execute_query(query)

	result["data"].map do |row| 
		{ :team => row[1], 
			:stadium => row[0], 
			:distance => haversine(lat, long, row[2], row[3]).round(2) } 
	end.to_json
end