import {gql, useQuery} from '@apollo/client';
import Dish from "./dish";

function Dishes({restId}) {
    const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;
    const {loading, error, data} = useQuery(GET_RESTAURANT_DISHES, {
        variables: {id: restId},
    });

    console.log(error)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR here</p>;
    if (!data) return <p>Not found</p>;

    let restaurant = data.restaurant;

    if (restId !== 0) {
        return (
            <>
                {restaurant.dishes.map((res) => (
                    <Dish
                        id={res.id}
                        name={res.name}
                        desciption={res.description}
                        price={res.price}
                        image={res.image}
                    />
                ))}
            </>
        )
    } else {
        return <h1> No Dishes</h1>
    }
}

export default Dishes