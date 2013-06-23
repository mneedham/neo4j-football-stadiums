neo4j-football-stadiums
=======================

Example of neo4j spatial using British Football Stadiums


    curl "http://download.neo4j.org/artifact?edition=community&version=1.9&distribution=tarball" -o neo4j.tar.gz
    tar -xvf neo4j.tar.gz

    bundle install
    bundle exec ruby create_stadiums.rb

 If you want to clear everything and start again:

    ./neo4j-community-1.9/bin/neo4j stop && rm -rf neo4j-community-1.9/data/graph.db/ && ./
neo4j-community-1.9/bin/neo4j start
    bundle exec ruby create_stadiums.rb