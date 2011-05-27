package ie.transportdublin.server.plugin.directions;

import ie.transportdublin.server.plugin.json.DirectionsList;
import ie.transportdublin.shortestpath.ShortestPath;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.neo4j.graphalgo.WeightedPath;
import org.neo4j.graphdb.Transaction;
import org.neo4j.server.database.Database;
import org.neo4j.server.rest.repr.OutputFormat;
import org.neo4j.server.webadmin.rest.SessionFactoryImpl;

@Path( "/directions" )
public class DirectionsResource
{
    private final Database database;
    private static ShortestPath threeLayeredTraverserShortestPath;
    private Transaction tx;

    public DirectionsResource( @Context Database database,
            @Context HttpServletRequest req, @Context OutputFormat output )
    {
        this( new SessionFactoryImpl( req.getSession( true ) ), database,output );
    }

    public DirectionsResource( SessionFactoryImpl sessionFactoryImpl, Database database, OutputFormat output )
    {
        this.database = database;
        threeLayeredTraverserShortestPath = new ShortestPath(database.graph);
    }

    @GET
    @Produces( MediaType.APPLICATION_JSON )
    @Path( "/" )
    public Response directions( @QueryParam( "lat1" ) double lat1,
            @QueryParam( "lon1" ) double lon1,
            @QueryParam( "lat2" ) double lat2,
            @QueryParam( "lon2" ) double lon2, @QueryParam( "time" ) double time )
    {
        if ( lat1 == 0 || lat1 == 0 || lon1 == 0 || lon2 == 0 || time==0 )
            return Response.serverError().entity( "params cannot be blank" ).build();
        tx = database.graph.beginTx();
        DirectionsList  directionsList =null;
        try
        {
            WeightedPath path = threeLayeredTraverserShortestPath.findShortestPath( lat1, lon1, lat2, lon2, time );
            if ( path != null )
            {
                DirectionsGenerator directionsGenerator = new DirectionsGenerator( path );
                if ( path.length() == 3 )
                    directionsList = directionsGenerator.convertOneBusPath( path, time );
                else
                    directionsList = directionsGenerator.convertTwoBusPath( path, time );
            }
            tx.success();
        }
        finally
        {
            tx.finish();
        }
        return Response.ok().entity( directionsList ).build();
    }
}
