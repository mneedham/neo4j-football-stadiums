neo4j-football-stadiums
=======================

Using neo4j spatial to create and query British Football Stadiums

To get started:

    curl "http://download.neo4j.org/artifact?edition=community&version=1.9&distribution=tarball" -o neo4j.tar.gz
    tar -xvf neo4j.tar.gz

    # copy across the spatial plugin
    git clone git://github.com/neo4j/spatial.git spatial
    cd spatial
    mvn clean package -Dmaven.test.skip=true install
    unzip target/neo4j-spatial-0.11-SNAPSHOT-server-plugin.zip -d /path/to/neo4j-community-1.9/plugins/
    /path/to/neo4j-community-1.9/bin/neo4j restart

    bundle install
    bundle exec ruby create_stadiums.rb

 If things go [Pete Tong](http://www.cockneyrhymingslang.co.uk/slang/pete-tong) and you want to clear everything and start over:

    ./neo4j-community-1.9/bin/neo4j stop && rm -rf neo4j-community-1.9/data/graph.db/ && ./neo4j-community-1.9/bin/neo4j start
    bundle exec ruby create_stadiums.rb