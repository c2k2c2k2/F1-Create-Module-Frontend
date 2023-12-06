import React,{useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.post('http://localhost:5223/fetchproducts')
      .then(response => {
        // Assuming the API response is stored in responseData
        // var responseData = [];
        var responseData=response.data;
        var responseArray= responseData.data;
        // Update the state with the fetched data
        // console.log("Response data:", responseData.data);
        setProducts(responseArray);
        // console.log("prods>>>",products);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  // useEffect(() => {
  //   // Fetch data from your API endpoint and set the products state
  //   // You can use fetch or any HTTP library (axios, etc.) to fetch the data
  //   fetch('/fetchproducts') // Replace with your actual endpoint URL
  //     // .then((response))
  //     .then((data) => {
  //       setProducts(data.data); // Assuming the products array is in data.data
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching products:', error);
  //     });
  // }, []);

  return (
    <>    
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    marginTop:"5rem"}}
    >

<Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Sl No.</th>
          <th>Product Category </th>
          <th> Product Name </th>
          <th> Qty/Unit </th>
        </tr>
      </thead>
      <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.productCategory}</td>
              <td>{product.productName}</td>
              <td>{product.productQty}</td>
            </tr>
          ))}
        </tbody>
    </Table>
    </div>
    </>
  );
}


export default Product;