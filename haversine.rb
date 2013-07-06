def haversine(lat1, long1, lat2, long2)  
  radius_of_earth = 6378.14 
  rlat1, rlong1, rlat2, rlong2 = [lat1, long1, lat2, long2].map { |d| as_radians(d)}
 
  dlon = rlong1 - rlong2
  dlat = rlat1 - rlat2
 
  a = power(Math::sin(dlat/2), 2) + Math::cos(rlat1) * Math::cos(rlat2) * power(Math::sin(dlon/2), 2)
  great_circle_distance = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
  radius_of_earth * great_circle_distance
end

def as_radians(degrees)
  degrees * Math::PI/180
end

def power(num, pow)
  num ** pow
end

# stadiums = [ [51.5549, -0.108436], [51.4816, -0.191034 ], [51.4859, -0.050743], [51.5093, -0.232204], 
#              [51.4749, -0.221619], [51.5601, -0.012551] ]

# stadiums.each do |row|
#   lat,long = row
#   p haversine(51.521348,-0.128113, lat, long)
# end             

