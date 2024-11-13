import { gql, useQuery } from '@apollo/client';

// this "autheticatedItem" returns something called a Union,
// which can indicate lots of different expected objects,
// so this needs to be formatted as below
export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # todo query the cart onnce we have it
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
