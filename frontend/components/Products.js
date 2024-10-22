import { useQuery } from '@apollo/client';
import { id } from 'date-fns/locale';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

// creates styling for the products when rendered on the page
const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  // React hook to make the query to the DB. This will return all the
  // data requested, any errors and if it is currently loading. Then
  // using destructuring to create 3 variables and pass each one the
  // returned information 'data, error, loading'
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>`Error: ${error.message}`</p>;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
      >
    </div>
  );
}
