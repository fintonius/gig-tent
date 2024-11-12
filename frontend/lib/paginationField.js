// import { PAGINATION_QUERY } from '../components/Pagination';

// export default function paginationField() {
//   return {
//     keyArgs: false, // tells Apollo we will manually  intervene
//     read(existing = [], { args, cache }) {
//       console.log({ existing, args, cache });
//       //   const { skip, first } = args;

//       // read the number of items on the page from the cache
//       //   const data = cache.readQuery({ query: PAGINATION_QUERY });
//       //   console.log(data);
//       // first thing it does asks the read function for these items
//       // we can do one of 2 things:
//       // one: return the items becasue they are already in the cache
//       // other: return false from here (network request)
//     },
//     merge() {
//       // this runs when the appol client comes back form the network with our products
//     },
//   };
// }
