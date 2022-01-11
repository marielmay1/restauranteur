import React, {useContext, useState} from "react";
import Cart from "../components/cart"
import RestaurantList from '../components/restaurantList';
import {InputGroup, InputGroupAddon, Input} from "reactstrap";
import AppContext from "../components/context";

function Home() {
    const [query, setQuery] = useState("");
    let {cart} = useContext(AppContext);

    return (
        <div>
            <div className="search">
                <h2> Local Restaurants</h2>
                <InputGroup>
                    <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                    <Input
                        onChange={(e) =>
                            setQuery(e.target.value.toLocaleLowerCase())
                        }
                        value={query}
                    />
                </InputGroup><br></br>
            </div>
            <RestaurantList search={query}/>
            { cart.items.length > 0 ? <Cart canOrder={true}> </Cart> : "" }
        </div>
    );
}

export default Home;
  