import React from 'react'
import Product from './product'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const ProductModal = ({handleChildData}) => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState("");

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
  const handleCheckboxChange = (productId,e) => {
    const index = selectedProducts.indexOf(productId);
    if (e.target.checked) {
      setSelectedProducts(productId);
      handleChildData(productId)
    } else {
      // const updatedSelectedProducts = selectedProducts.filter(id => id !== productId);
      setSelectedProducts("");
      handleChildData("");
    }
    // console.log("prodid",productId)
    
 
    // console.log("jhbjhbjhb",name)
   
  };
  return (
<>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "5rem"
    }}
  >
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th></th>
          <th>Sl No.</th>
          <th>Product Category</th>
          <th>Product Name</th>
          <th>Qty/Unit</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product._id}>
            <td>
              <input
                type="checkbox"
                onChange={(e)=>{
                  handleCheckboxChange(product.productName,e)
                }}
                // Handle the checkbox change event as needed
                // onChange={() => handleCheckboxChange(product._id)}
              />
            </td>
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
  )
}

export default ProductModal