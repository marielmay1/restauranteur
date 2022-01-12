import {Col} from "reactstrap";
import {Button, Card} from "react-bootstrap";
import {useContext} from "react";
import AppContext from "./context";

function Dish({dish}) {
    const {addItem} = useContext(AppContext)
    return (
        <Col xs="6" sm="4" style={{padding: 0}} key={dish.id}>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={`${dish.image_url}`}/>
                <Card.Body>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Text>{dish.description}</Card.Text>
                    <Button
                        variant="info"
                        onClick={() => addItem(dish)}
                    > + Add To Cart</Button>
                </Card.Body>
                <Card.Footer className="text-center text-muted">Price: ${dish.price}</Card.Footer>
            </Card>
        </Col>
    )
}

export default Dish