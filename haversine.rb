def haversine(lat1, long1, lat2, long2)
  p lat1, long1, lat2, long2
  dtor = Math::PI/180
  r = 6378.14
 
  rlat1 = lat1 * dtor 
  rlong1 = long1 * dtor 
  rlat2 = lat2 * dtor 
  rlong2 = long2 * dtor 
 
  dlon = rlong1 - rlong2
  dlat = rlat1 - rlat2
 
  a = power(Math::sin(dlat/2), 2) + Math::cos(rlat1) * Math::cos(rlat2) * power(Math::sin(dlon/2), 2)
  c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
  d = r * c
 
  d
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

