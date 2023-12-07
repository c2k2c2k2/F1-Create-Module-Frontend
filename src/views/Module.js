import _ from "lodash";
import React, { useState } from "react";
import {
  Modal,
  Button,
  Card,
  Container,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";

const YourComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFieldModal, setFieldModal] = useState(false);
  const [addAfterParam, setAddAfterParam] = useState("");
  const [blockName, setBlockName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [blocks, setBlocks] = useState([]); // Define blocks state
  const [customFieldName, setCustomFieldName] = useState("");
  const [selectedField, setSelectedField] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleAddAfterChange = (event) => {
    setAddAfterParam(event.target.value);
  };

  const handleSave = () => {
    setBlocks([...blocks, { name: blockName, fields: [] }]);
    setBlockName("");
    handleCloseModal();
  };

  const handleAddCustomField = () => {
    if (addAfterParam === "Custom Field") {
      setBlocks([...blocks, "Custom Field"]);
    }
  };

  const handleAddBlock = () => {
    if (blockName.trim() !== "") {
      setBlocks([...blocks, blockName]);
      setBlockName("");
    }
  };

  return (
    <>
      <Card style={{ width: "100%", height: "100vh", marginTop: "5rem" }}>
        <Container fluid>
          <Row style={{ alignItems: "center" }}>
            <p style={{ padding: "10px", margin: "auto 0" }}>Module</p>
            <Dropdown onSelect={(e) => setModuleName(e)}>
              <Dropdown.Toggle
                size="sm"
                variant={moduleName == "" ? "success" : "primary"}
                id="dropdown-basic"
              >
                {moduleName == "" ? `Dropdown Button` : moduleName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey={"contact"}>Contact</Dropdown.Item>
                <Dropdown.Item eventKey={"product"}>Product</Dropdown.Item>
                <Dropdown.Item eventKey={"address"}>Address</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {moduleName != "" && (
              <Button
                variant="secondary"
                size="sm"
                style={{ marginLeft: "100px" }}
                onClick={() => setShowModal(true)}
              >
                Add Block
              </Button>
            )}
          </Row>
        </Container>
        {/* <Button variant="success" onClick={handleAddBlock}>
          Add Custom Field
        </Button> */}
        <Container style={{ paddingTop: "50px" }} fluid>
          <Row>
            <p
              style={{
                fontWeight: "500",
                padding: "0 20px",
                textTransform: "uppercase",
              }}
            >
              {moduleName}
            </p>
          </Row>
          {blocks.length > 0 &&
            blocks.map((block) => (
              <Row>
                <Col>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ fontWeight: "600", margin: "auto 30px" }}>
                      {block.name}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setFieldModal(true);
                        setSelectedField(block.name);
                      }}
                    >
                      Add CustomField
                    </Button>
                  </div>
                  <Card
                    style={{
                      padding: "1.5rem",
                      margin: "0 30px",
                      minHeight: "300px",
                    }}
                  >
                    {block.fields.map((item) => (
                      <p>CustomField: {item}</p>
                    ))}
                  </Card>
                </Col>
              </Row>
            ))}
        </Container>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>Add Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h5>Block Name</h5>
              <input
                type="text"
                placeholder="Enter text"
                style={{
                  marginLeft: "1rem",
                  padding: "0.5rem",
                  width: "200px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                onChange={(e) => {
                  setBlockName(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showFieldModal} onHide={() => setFieldModal(false)}>
        <Modal.Header>
          <Modal.Title>Add Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h5>Field Name</h5>
              <input
                type="text"
                placeholder="Enter text"
                style={{
                  marginLeft: "1rem",
                  padding: "0.5rem",
                  width: "200px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                onChange={(e) => {
                  setCustomFieldName(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              const block = blocks.filter(
                (item) => item.name == selectedField
              )[0];
              const newFieldsArr = [...block.fields, customFieldName];
              block.fields = newFieldsArr;
              setBlocks(_.unionBy(blocks, [block], "name"));
              setFieldModal(false);
              setSelectedField(null);
              setCustomFieldName("");
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default YourComponent;
