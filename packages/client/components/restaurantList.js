import {gql, useQuery} from '@apollo/client';
import Router from "next/router";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    Container,
    Row,
    Col
} from "reactstrap";

function RestaurantList(props) {
    const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image_url
        image {
          url
        }
      }
    }
  `;
    const {loading, error, data} = useQuery(GET_RESTAURANTS)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {JSON.stringify(error)}</p>;
    if (!data) return <p>Not found</p>;
    console.log(`Query Data: ${data.restaurants}`)

    const searchQuery = data.restaurants.filter((res) => {
        return res.name.toLowerCase().includes(props.search)
    })

    if (searchQuery.length > 0) {
        const restList = searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
                <Card style={{margin: "0 0.5rem 20px 0.5rem"}}>
                    <CardImg
                        top={true}
                        style={{height: 200}}
                        src={
                            res.image_url
                        }
                    />
                    <CardBody>
                        <CardText>{res.description}</CardText>
                    </CardBody>
                    <div className="card-footer">
                        <Button
                            color="info"
                            onClick={() => Router.push(`/restaurant/${res.id}`)}>{res.name}
                        </Button>
                    </div>
                </Card>
            </Col>
        ))

        return (
            <Container>
                <Row xs='3'>{restList}</Row>
            </Container>
        )
    } else {
        return <h1> No Restaurants Found</h1>
    }
}

export default RestaurantList