import React, {useContext, useState} from "react";
import { useRouter } from 'next/router'
import AppContext from "../../components/context";
import {Container, Input, InputGroup, InputGroupAddon} from "reactstrap";
import Cart from "../../components/cart";
import {gql, useQuery} from '@apollo/client';
import Dishes from "../../components/dishes";



function Restauraunt() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    console.log(`URL: ${API_URL}`)
    const router = useRouter()
    const { pid } = router.query
    const [query, setQuery] = useState("");
    let {cart} = useContext(AppContext);

    const GET_RESTAURANT = gql`
    query {
      restaurant(id: "${pid}") {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
    const {loading, error, data} = useQuery(GET_RESTAURANT)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {JSON.stringify(error)}</p>;
    if (!data) return <p>Not found</p>;
    const restaurant = data.restaurant;
    console.log(`Query Data: ${JSON.stringify(restaurant, null, 2)}`)

    return (
        <div>
            <div className="search">
                <h2>{restaurant.name}</h2>
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
            <Container>
                <Dishes restId={restaurant.id}></Dishes>
                { cart.items.length > 0 ? <Cart canOrder={true}> </Cart> : "" }
            </Container>
        </div>
    );
}

export default Restauraunt;