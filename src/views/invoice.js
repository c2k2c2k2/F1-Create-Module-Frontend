// import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { BsPlus, BsTrash } from "react-icons/bs";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import { AddCircle } from "@mui/icons-material";
import ProductModal from "./ProductModal";
import { Modal } from "react-bootstrap";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function Invoice() {
  const taxregion = [
    { label: "Within WestBengal" },
    { label: "Outside WestBengal" },
  ];
  const options = ["Option 1", "Option 2"];
  const currency = [
    { label: "USA,Dollars($)" },
    { label: "INDIA,Rupees(₹)" },
    { label: "United Arab Emirates,Dirham(AED)" },
  ];
  const option = ["Option 1", "Option 2", "Option 3"];

  const taxmode = [{ label: "Individual" }, { label: "Group" }];
  const optn = ["Option 1", "Option 2"];

  const invoices = [{ label: "New Invoice" }, { label: "Order to Invoice" }];

  const stat = [{ label: "Sent" }, { label: "Pending" }];
  var itemsTotal = 0;
  const [formData, setFormData] = useState({
    invoiceType: "",
    opportunityName: "",
    organizationName: "",
    salesOrder: "",
    contactName: "",
    salesComission: "",
    subject: "",
    dueDate: "",
    invoiceDate: "",
    purchaseOrder: "",
    assignedTo: "",
    status: "",
    statementno: "",
    amount: "",
    CopyBillingAddressFrom: "",
    CopyShippingAddressFrom: "",
    BillingAddress: "",
    ShippingAddress: "",
    BillingCity: "",
    ShippingCity: "",
    BillingState: "",
    ShippingState: "",
    BillingPostalCode: "",
    ShippingPostalCode: "",
    BillingCountry: "",
    ShippingCountry: "",
    CompanyMaster: "",
    BankMaster: "",
    BankName: "",
    BeneficiaryName: "",
    SwiftCode: "",
    AccountNumber: "",
    BeneficiaryBankAddress: "",
    ABARouting: "",
    IFSCode: "",
    Statement: "",
    paymentTerms: "",
    micr: "",
    Description: "",
    Itemname: "",
    Quantity: "",
    Sellingprice: "",
    itemsTotal,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [products, setProducts] = useState([
    { itemName: "", quantity: "", sellingPrice: "" },
  ]);
  const addProduct = () => {
    const newProduct = { itemName: "", quantity: "", sellingPrice: "" };
    setProducts([...products, newProduct]);
  };
  const handleProducts = () => {
    setIsModalOpen(true);
  };
  const mandatoryFields = [
    "organizationName",
    "subject",
    "invoiceDate",
    "assignedTo",
    "status",
    "billingAddress",
    "shippingAddress",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const updatedProducts = [...products];
  //   updatedProducts[index][name] = value;
  //   setProducts(updatedProducts);
  // };

  const calculateTotalSellingPrice = () => {
    // Your logic to calculate total selling price
    // For example:
    const sellingPrices = [/* array of selling prices */];
    const totalSellingPrice = sellingPrices.reduce((acc, price) => acc + (price || 0), 0);
    return totalSellingPrice;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.organizationName === "" ||
      formData.subject === "" ||
      formData.invoiceDate === "" ||
      formData.assignedTo === "" ||
      formData.status === "" ||
      formData.BillingAddress === "" ||
      formData.ShippingAddress === ""
    
    )
    
    {
      Swal.fire({
        icon: "error",
        title: "Warning...",
        text: "Please fill in all the mandatory fields!",
      });
      return;
    }

    const totalSellingPrice = calculateTotalSellingPrice(); // Replace this with your actual logic

    // Include totalSellingPrice in the form data
    const formDataWithTotal = {
      ...formData, // Include other form data
      totalSellingPrice: totalSellingPrice.toFixed(2), // Include totalSellingPrice
    };
    try {
      const response = await axios.post(
        "http://localhost:5223/addrecord",
        formData
      );
      console.log(response.data);
      console.log("formData....", formData);

      // // Show SweetAlert on successful form submission
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Invoice added successfully!",
      });
    } catch (error) {
      console.error("Error adding record", error);
    }
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleReset = () => {
    window.location.reload();
  };

  // const [sellingPrice, setSellingPrice] = useState(0);
  // const handleSellingPriceChange = (e) => {
  //   const price = parseFloat(e.target.value);
  //   if (!isNaN(price)) {
  //     setSellingPrice(price);
  //   } else {
  //     setSellingPrice(0);
  //   }
  // };

  // const totalSellingPrice = sellingPrices.reduce((acc, price) => acc + (price || 0), 0);

  const [dataFromChild, setDataFromChild] = useState("");

  const handleChildData = (data) => {
    console.log("Data from child:", data);
    setDataFromChild(data);
  };
  // const overallDiscount = 0;
  // itemsTotal = sellingPrice - overallDiscount;
  // // ItemsTotal=itemsTotal;

  const [formDatas, setFormDatas] = useState({
    BillingAddress: "",
    BillingCity: "",
    BillingState: "",
    BillingPostalCode: "",
    BillingCountry: "",
    ShippingAddress: "",
    ShippingCity: "",
    ShippingState: "",
    ShippingPostalCode: "",
    ShippingCountry: "",
    copyBillingToShipping: false,
  });
  const handleChanges = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Copy billing address details to shipping when checkbox is checked
      ...(name === "copyBillingToShipping" && checked
        ? {
            ShippingAddress: prevData.BillingAddress,
            ShippingCity: prevData.BillingCity,
            ShippingState: prevData.BillingState,
            ShippingPostalCode: prevData.BillingPostalCode,
            ShippingCountry: prevData.BillingCountry,
          }
        : {}),
    }));
  };

  const [sellingPrices, setSellingPrices] = useState([]);

  const handleSellingPriceChange = (e, index) => {
    const { value } = e.target;

    // Copy the existing sellingPrices array
    const updatedSellingPrices = [...sellingPrices];

    // Update the selling price for the corresponding index
    updatedSellingPrices[index] = parseFloat(value);

    // Set the updated sellingPrices array
    setSellingPrices(updatedSellingPrices);
  };

  // Calculate total selling price
  const totalSellingPrice = sellingPrices.reduce(
    (acc, price) => acc + (price || 0),
    0
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <div style={{ marginTop: "5rem" }}>
          <h4>Creating New Invoice</h4>
        </div>
        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Container style={{ paddingTop: "2rem" }}>
            <div>
              <h5>Sales Information</h5>
            </div>
            <Row style={{ paddingTop: "2rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "2rem", marginLeft: "5rem" }}>
                  Invoice Type
                </label>

                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: 200 }}
                  options={invoices}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="invoiceType"
                      label="Select Invoice Type"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                        style: { height: "10px" }, // Adjust height as needed
                      }}
                    />
                  )}
                />

                <label style={{ marginRight: "1rem", marginLeft: "5rem" }}>
                  Opportunity Name
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="oppotunityName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  display: "flex",
                  marginLeft: "3rem",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "red", marginRight: "5px" }}>*</span>
                <label style={{ marginRight: "1.5rem" }}>
                  Organizaton Name
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="organizationName"
                      onChange={handleChange}
                      required // This makes the field mandatory
                    />
                  </Form.Group>
                </Form>
                <label style={{ marginRight: "2.8rem", marginLeft: "6rem" }}>
                  Sales Order
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="salesOrder"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Contact Name
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="contactName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                <label style={{ marginRight: "2rem", marginLeft: "4.4rem" }}>
                  Sales Commission
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name=" salesComission"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>
        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Container style={{ paddingTop: "2rem" }}>
            <div>
              <h5>Invoice Details</h5>
            </div>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <span
                  style={{
                    color: "red",
                    marginLeft: "2rem",
                    marginRight: "0.5rem",
                  }}
                >
                  *
                </span>
                <label style={{ marginRight: "3rem" }}>Subject</label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="subject"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                <label style={{ marginRight: "1rem", marginLeft: "5rem" }}>
                  Due Date
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="date"
                      name="dueDate"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: "flex", marginLeft: "3rem" }}>
                <span
                  style={{
                    color: "red",
                    marginLeft: "2rem",
                    marginRight: "0.5rem",
                  }}
                >
                  *
                </span>
                <label style={{ marginRight: "1.5rem" }}>Invoice Date</label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="date"
                      name="invoiceDate"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                <label style={{ marginRight: "2.8rem", marginLeft: "6rem" }}>
                  Purchase Order
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="purchaseOrder"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <span
                  style={{
                    color: "red",
                    marginLeft: "2rem",
                    marginRight: "0.5rem",
                  }}
                >
                  *
                </span>
                <label style={{ marginRight: "1.7rem" }}>Assigned To</label>{" "}
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="assignedTo"
                      // value="Furheen Mondal"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                <span
                  style={{
                    color: "red",
                    marginLeft: "2rem",
                    marginRight: "0.5rem",
                  }}
                >
                  *
                </span>
                <label style={{ marginRight: "3rem" }}>Status</label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="status"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>{" "}
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Statement No.
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="statementno"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>
        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Container style={{ paddingTop: "2rem" }}>
            <div>
              <h5>Custom Information</h5>
            </div>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "3rem", marginLeft: "5rem" }}>
                  Amount in Words
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="amount"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>
        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Container style={{ paddingTop: "2rem" }}>
            <div>
              <h5>Address Details</h5>
            </div>
            <Row>
              <Col style={{ display: "flex" }}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Checkbox
                    required
                    control={<Checkbox />}
                    label="Copy Billing Address to Shipping Address"
                    name="copyBillingToShipping"
                    onChange={handleChanges}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: "flex", marginLeft: "3rem" }}>
                <span style={{ color: "red", marginRight: "5px" }}>*</span>
                <label style={{ marginRight: "1.5rem" }}>Billing Address</label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      required
                      type="text"
                      name="BillingAddress"
                      value={formData.BillingAddress}
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
                <span
                  style={{
                    color: "red",
                    marginRight: "0.5rem",
                    marginLeft: "10rem",
                  }}
                >
                  *
                </span>
                <label style={{ marginRight: "1.5rem" }}>
                  Shipping Address
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="ShippingAddress"
                      value={
                        formData.copyBillingToShipping
                          ? formData.BillingAddress
                          : formData.ShippingAddress
                      }
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Billing City
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="BillingCity"
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
                <label style={{ marginRight: "2rem", marginLeft: "4.4rem" }}>
                  Shipping City
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="ShippingCity"
                      value={
                        formData.copyBillingToShipping
                          ? formData.BillingCity
                          : formData.ShippingCity
                      }
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Billing State
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="BillingState"
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Shipping State
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="ShippingState"
                      value={
                        formData.copyBillingToShipping
                          ? formData.BillingState
                          : formData.ShippingState
                      }
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Billing Postal Code
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="BillingPostalCode"
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
                <label style={{ marginRight: "2rem", marginLeft: "4.4rem" }}>
                  Shipping Postal Code
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="ShippingPostalCode"
                      value={
                        formData.copyBillingToShipping
                          ? formData.BillingPostalCode
                          : formData.ShippingPostalCode
                      }
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Billing Country
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="BillingCountry"
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Shipping Country
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="ShippingCountry"
                      value={
                        formData.copyBillingToShipping
                          ? formData.BillingCountry
                          : formData.ShippingCountry
                      }
                      onChange={handleChanges}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>

        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Container style={{ paddingTop: "2rem" }}>
            <div>
              <h5>Company Bank Details</h5>
            </div>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Company Master
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="CompanyMaster"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Bank Master
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="BankMaster"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Bank Name
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control type="text" onChange={handleChange} />
                  </Form.Group>
                </Form>
              </Col>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Beneficiary Name
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name=" BeneficiaryName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Swift Code
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name=" SwiftCode"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Account Number
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name=" AccountNumber"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Beneficiary Bank Address
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="BeneficiaryBankAddress"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  ABA Routing
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="ABARouting"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  IFS Code
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="IFSCode"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Statement
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="ABARouting"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Payment Terms(NET)
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="paymentTerms"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  MICR
                </label>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="micr"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>
        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Container style={{ paddingTop: "2rem" }}>
            <div>
              <h5>Terms & Conditions</h5>
            </div>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "4rem", marginLeft: "3rem" }}>
                  Terms & Conditions
                </label>
                <Form
                  style={{
                    width: "70%",
                    marginBottom: "2rem",
                    marginRight: "3rem",
                  }}
                >
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      style={{ backgroundColor: "azure" }}
                      as="textarea"
                      rows={3}
                      defaultValue="-Unless otherwise agreed in writing by the supplier all invoices are payable within thirty (30) days of the date of invoice, in the currency of the invoice, drawn on a bank based in India or by such other method as is agreed in advance by the Supplier."
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>

        <Card style={{ width: "100%", marginTop: "1rem" }}>
          <Container style={{ paddingTop: "2rem" }}>
            <div>
              <h5>Description Details</h5>
            </div>
            <Row style={{ paddingTop: "1rem" }}>
              <Col style={{ display: "flex" }}>
                <label style={{ marginRight: "1.7rem", marginLeft: "4.5rem" }}>
                  Description
                </label>
                <Form style={{ width: "70%", marginBottom: "2rem" }}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      style={{ backgroundColor: "azure" }}
                      as="textarea"
                      rows={3}
                      name="Description "
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card>
        <Card style={{ width: "100%", marginTop: "0.5rem" }}>
          <Container style={{ paddingTop: "2rem" }}>
            <Row
              style={{
                width: "100%",
              }}
            >
              <Col lg={2}>
                <h5>Item Details</h5>
              </Col>

              <Col style={{ display: "flex" }} lg={4}>
                Tax Region
                <Autocomplete
                  sx={{
                    display: "inline-block",
                    "& input": {
                      width: 150,
                      bgcolor: "background.paper",
                      color: (theme) =>
                        theme.palette.getContrastText(
                          theme.palette.background.paper
                        ),
                    },
                  }}
                  id="custom-input-demo"
                  options={taxregion}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                />
              </Col>
              <Col style={{ display: "flex" }} lg={3}>
                Currency
                <Autocomplete
                  sx={{
                    display: "inline-block",
                    "& input": {
                      width: 150,
                      bgcolor: "background.paper",
                      color: (theme) =>
                        theme.palette.getContrastText(
                          theme.palette.background.paper
                        ),
                    },
                  }}
                  id="custom-input-demo"
                  options={currency}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                />
              </Col>
              <Col lg={3} style={{ display: "flex" }}>
                Tax Mode
                <Autocomplete
                  sx={{
                    display: "inline-block",
                    "& input": {
                      width: 150,
                      bgcolor: "background.paper",
                      color: (theme) =>
                        theme.palette.getContrastText(
                          theme.palette.background.paper
                        ),
                    },
                  }}
                  id="custom-input-demo"
                  options={taxmode}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                />
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>TOOLS</th>
                  <th>Item Name </th>
                  <th>Quantity</th>

                  <th>Selling Price</th>
                  <th>Total</th>
                  <th>Net Price</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      {index === products.length - 1 && (
                        <Button
                          variant="link"
                          onClick={() => removeProduct(index)}
                        >
                          <BsTrash />
                        </Button>
                      )}
                    </td>
                    <td>
                      <div>
                        <Box
                          component="form"
                          sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            name="itemName"
                            value={dataFromChild}
                            // onChange={(e) => handleInputChange(e, index)}
                          />
                        </Box>
                      </div>
                      <div>
                        <TextField
                          required
                          id="filled-required"
                          label=""
                          defaultValue=""
                          variant="filled"
                        />
                      </div>
                      <IconButton
                        style={{ marginLeft: "15rem" }}
                        onClick={handleProducts}
                      >
                        <AddCircle />
                      </IconButton>

                      <Modal
                        show={isModalOpen}
                        onHide={() => setIsModalOpen(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* Render your custom modal content component */}
                          <ProductModal handleChildData={handleChildData} />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Close
                          </Button>
                          {/* Add any other footer buttons as needed */}
                        </Modal.Footer>
                      </Modal>
                    </td>
                    <td>
                     
                      <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="1"
                      name="Quantity"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                    </td>
                    <td>
                      <td>
                       
                        <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="0"
                      name="Sellingprice"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Card>
        <Card>
          <div style={{ marginLeft: "3rem" }}>
            <Button variant="primary" onClick={addProduct}>
              Add Product
            </Button>
          </div>
        </Card>
      </div>
      <Card>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Items Total</th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
             <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="organizationName"
                      onChange={handleChange}
                      required // This makes the field mandatory
                    />
                  </Form.Group>
                </Form>
          </tbody>
        </Table>
      </Card>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="success" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outline-info" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
  );
}

export default Invoice;
