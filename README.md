neo4j-football-stadiums
=======================

Using neo4j spatial to create and query British Football Stadiums

To get started:

    curl "http://download.neo4j.org/artifact?edition=community&version=1.9&distribution=tarball" -o neo4j.tar.gz
    tar -xvf neo4j.tar.gz
    bundle install
    bundle exec ruby create_stadiums.rb

 If everything goes [Pete Tong](http://www.cockneyrhymingslang.co.uk/slang/pete-tong) and you want to clear everything and start over:

    ./neo4j-community-1.9/bin/neo4j stop && rm -rf neo4j-community-1.9/data/graph.db/ && ./
neo4j-community-1.9/bin/neo4j start
    bundle exec ruby create_stadiums.rb