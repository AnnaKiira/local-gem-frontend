import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const PlaceList = ({places}) => {
  console.log(places)


  return (
    <main className="places">
      <Container>
        <Row>
          { places.length > 0 ?
            places.map(place => { 
              return (
                <Col key={place._id} sm="6" md="4" lg="3" className="mb-4">

        <Link to={`/places/${place._id}`}>
          <article>
            <header>
              <h2>{place.placeName}</h2>
            </header>
            <p>{place.description}</p>
            {place.image && (
              <div className="upload-image" style={{backgroundImage: `url(${place.image})`}}> </div>
            )}
          </article>
        </Link>
        </Col>
      )
          })
    :
    <h2> No posts to display.</h2>
  }
      </Row>
     </Container>
    </main>
  );
};

export default PlaceList;