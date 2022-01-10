import {Col} from "reactstrap";
import {Button, Card} from "react-bootstrap";
import {useContext} from "react";
import AppContext from "./context";

function Dish({id, name, description, image, price}) {
    const {addItem} = useContext(AppContext)
    return (
        <Col xs="6" sm="4" style={{padding: 0}} key={id}>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={`http://localhost:1337${image.url}`}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Button
                        variant="info"
                        onClick={() => addItem(res)}
                    > + Add To Cart</Button>
                </Card.Body>
                <Card.Footer className="text-center text-muted">Price: ${price}</Card.Footer>
            </Card>
        </Col>
    )
}

export default Dish