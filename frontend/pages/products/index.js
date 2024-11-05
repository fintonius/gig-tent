import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

// this page is what "products" used to be in the main folder
// this establihses a basic page for all product pages

export default function OrderPage() {
  // query info from Router (a next.js feature) to retrive page number
  const { query } = useRouter();
  // convert to integer
  const page = parseInt(query.page);

  // then return either the Router retrieved query page number, or else default to 1
  return (
    <div>
      <Pagination page={page || 1} />
      <Products />
      <Pagination page={page || 1} />
    </div>
  );
}
