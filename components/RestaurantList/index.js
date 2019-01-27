/* components/RestaurantList/index.js */
import gql from "graphql-tag";
import Link from "next/link";
import { graphql } from "react-apollo";
import {
  Card,
  CardBody,
  CardImg} from "reactstrap";
import { CardText, CardTitle } from "reactstrap";

const RestaurantList = (
  { data: { error, restaurants }, search }) => {
  if (error) return "Error loading restaurants";
  //if restaurants are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch

  if (restaurants && restaurants.length) {
    //searchQuery
    const searchQuery = restaurants.filter(query =>
      query.name.toLowerCase().includes(search)
    );
    if (searchQuery.length != 0) {
      return (
        <div>
          {searchQuery.map(res => (
            <Card
              style={{ width: "30%", margin: "0 10px" }}
              className="h-100"
              key={res._id}
            >
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={`http://localhost:1337${res.image.url}`}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description.substr(0, 150)}</CardText>
              </CardBody>
              <div className="card-footer">
                <Link
                  as={`/restaurants/${res._id}`}
                  href={`/restaurants?id=${res._id}`}
                >
                  <a className="btn btn-primary">View</a>
                </Link>
              </div>
            </Card>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </div>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h1>Loading</h1>;
};

const query = gql`
  {
    restaurants {
      _id
      name
      description
      image {
        url
      }
    }
  }
`;
RestaurantList.getInitialProps = async () => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(RestaurantList);