#!/bin/bash
# Install Script tested on OSX
export NEO4J_HOME=/Users/Paddy/dev/neo4j-enterprise-1.4.M02
export MAVEN_OPTS="-Xmx512m" 
mvn clean install
echo "Copying DB & Plugins to NEO4J_HOME"
cp -r target/db $NEO4J_HOME/data/graph.db
cp -r target/plugins $NEO4J_HOME
echo "org.neo4j.server.thirdparty_jaxrs_classes=ie.transportdublin.server=/plugin" >>  $NEO4J_HOME/conf/neo4j-server.properties
echo "cache_type=strong" >>  $NEO4J_HOME/conf/neo4j.properties
$NEO4J_HOME/bin/neo4j start
npm install 
node src/main/webapp/server.js
