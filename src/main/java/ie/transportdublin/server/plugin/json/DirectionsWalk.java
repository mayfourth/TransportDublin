package ie.transportdublin.server.plugin.json;

import ie.transportdublin.xml.Stop;

import java.util.Arrays;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.neo4j.graphdb.PropertyContainer;

@XmlRootElement
public class DirectionsWalk
{

    private Integer distance;
    private List<Coordinate> latLon;

    public DirectionsWalk()
    {
    }

    public DirectionsWalk( double distanceInMins, PropertyContainer start,
            PropertyContainer end )
    {
        super();
        Coordinate walk1 = new Coordinate(
                (Double) start.getProperty( Stop.LATITUDE ),
                (Double) start.getProperty( Stop.LONGITUDE ) );
        Coordinate walk2 = new Coordinate(
                (Double) end.getProperty( Stop.LATITUDE ),
                (Double) end.getProperty( Stop.LONGITUDE ) );
        this.distance = (int) ( Math.round( distanceInMins * 1e2 ) / 1e2 );
        this.latLon = Arrays.asList( walk1, walk2 );
    }

    @XmlElement
    public Integer getDistance()
    {
        return distance;
    }

    public void setDistance( Integer distance )
    {
        this.distance = distance;
    }

    @XmlElement
    public List<Coordinate> getLatLon()
    {
        return latLon;
    }

    public void setLatLon( List<Coordinate> latLon )
    {
        this.latLon = latLon;
    }

}
