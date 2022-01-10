import Dish from "./dish";
import {Row} from "reactstrap";

function Dishes({dishes}) {
    if (dishes.length !== 0) {
        return (
            <Row>
                {dishes.map((res) => (
                    <Dish dish={res}/>
                ))}
            </Row>
        )
    } else {
        return <h1> No Dishes</h1>
    }
}

export default Dishes