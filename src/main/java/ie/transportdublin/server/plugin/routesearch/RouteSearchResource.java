package ie.transportdublin.server.plugin.routesearch;

import ie.transportdublin.server.plugin.json.RouteStop;
import ie.transportdublin.server.plugin.json.Routes;
import ie.transportdublin.xml.Stop;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.lucene.index.Term;
import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.index.Index;
import org.neo4j.graphdb.index.IndexHits;
import org.neo4j.index.lucene.QueryContext;
import org.neo4j.server.database.Database;
import org.neo4j.server.rest.repr.OutputFormat;
import org.neo4j.server.webadmin.rest.SessionFactoryImpl;

@Path( "/routesearch" )
public class RouteSearchResource
{

    private Routes routeList;
    private Index<Node> stopLayer;
    private final Database database;

    public RouteSearchResource( @Context Database database,
            @Context HttpServletRequest req, @Context OutputFormat output )
    {
        this( new SessionFactoryImpl( req.getSession( true ) ), database,
                output );
    }

    public RouteSearchResource( SessionFactoryImpl sessionFactoryImpl,
            Database database, OutputFormat output )
    {
        this.database = database;
        this.stopLayer = database.graph.index().forNodes( "stopLayer" );
    }

    @GET
    @Produces( MediaType.APPLICATION_JSON )
    @Path( "/" )
    public Response routeSearch( @QueryParam( "routeId" ) String routeId )
    {

        if ( routeId == null || routeId.trim().length() == 0 )
            return Response.serverError().entity( "routeId cannot be blank" ).build();
        IndexHits<Node> hits = stopLayer.query( new QueryContext( new Term(
                Stop.ROUTEID, routeId ) ).sort( new Sort( new SortField(
                Stop.STOPNUM, SortField.INT ) ) ) );

        if ( hits.hasNext() )
        {
            routeList = new Routes();
            for ( Node hit : hits )
                routeList.add( new RouteStop( hit ) );
            return Response.ok().entity( routeList ).build();
        }
        else
        {
            return Response.status( 400 ).entity(
                    "No Route Found: " + routeId ).build();
        }
    }


}
