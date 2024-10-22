import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

// this is what is adding the new product to the site using Keystone to
// create the 'mutation'
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # these are the variables getting passed in and what type they are
    # the ! at the end of the types below means they are required
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      # this is information from the newly created product entry that
      # Keystone will pass back
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  // using destructuring to 'inputs' & 'handleChange'
  // from the useForm custom hook
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    // have to set default values for these properties
    image: '',
    name: 'test data',
    price: 1234,
    description: 'some more dummy data',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      // this is passing all the values listed in 'inputs' from the
      // destructuring above to the MUTATION we have created
      variables: inputs,
    }
  );

  return (
    <Form
      // this is a quick inline function that fires when the user clicks
      // the submit button
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // submit the input fields to the backend
        const res = await createProduct();
        console.log(res);
      }}
    >
      <DisplayError error={error} />
      <fieldset
        // the 'disabled' & 'aria-busy' properties are being triggered when
        // the page state is 'loading'. It means that all the form inputs will be
        // disabled so a user can't change any data after clicking submit and the
        // 'aria-busy' is triggering some CSS to make the orange loading bar move
        // so the user knows something is happening
        disabled={loading}
        aria-busy={loading}
      >
        <label htmlFor="image">
          Image
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit"> + Add Product</button>
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </fieldset>
    </Form>
  );
}
