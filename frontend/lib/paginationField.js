import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will manually  intervene
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;

      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // we don't have any items, we must go to the network to fetch them
        return false;
      }
      // if there are items just return them form the cache and we don't need ot go to the network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to Apollo`
        );
        return items;
      }

      return false; // fallback to network

      // first thing it does asks the read function for these items
      // we can do one of 2 things:
      // one: return the items becasue they are already in the cache
      // other: return false from here (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the appol client comes back form the network with our products
      console.log(`merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // finally return merged items from cache
      // apparently once these items are retrieved from the network and merged with the local cache, Apollo executes the read function above again
      return merged;
    },
  };
}
