#!/bin/bash
# Reinstall Script
export NEO4J_HOME=/Users/Paddy/dev/neo4j-enterprise-1.4.M02
echo "Stopping Neo4j"
$NEO4J_HOME/bin/neo4j stop
mvn clean install 
echo "Copying DB"
rm -r $NEO4J_HOME/data/graph.db
cp -r target/db $NEO4J_HOME/data/graph.db
echo "Copying Plugins"
rm -r $NEO4J_HOME/plugins
cp -r target/plugins $NEO4J_HOME
echo "Starting Neo4j"
$NEO4J_HOME/bin/neo4j start
node src/main/webapp/server.js
