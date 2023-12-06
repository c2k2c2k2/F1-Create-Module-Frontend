import React, { useState } from 'react';
import { Modal, Button, Card, Container, Dropdown } from 'react-bootstrap';

const YourComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [addAfterParam, setAddAfterParam] = useState('');
  const [blockName, setBlockName] = useState('');
  const [blocks, setBlocks] = useState([]); // Define blocks state

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
    handleAddCustomField();
    handleCloseModal();
  };
  
  const handleAddCustomField = () => {
    if (addAfterParam === 'Custom Field') {
      setBlocks([...blocks, 'Custom Field']);
    }
  };
  
  const handleAddBlock = () => {
    if (blockName.trim() !== '') {
      setBlocks([...blocks, blockName]);
      setBlockName('');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingLeft: '2rem',
          paddingRight: '2rem',
        }}
      >
        <Card style={{ width: '100%', marginTop: '5rem' }}>
        <Container>
            <Button variant="success" onClick={handleAddBlock}>
              Add Custom Field
            </Button>
          </Container>
          <Container>
            <Button variant="success" onClick={handleButtonClick}>
              Add Block
            </Button>
          </Container>
        </Card>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Window</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h5>Block Name</h5>
              <input
                type="text"
                placeholder="Enter text"
                style={{
                  marginLeft: '1rem',
                  padding: '0.5rem',
                  width: '200px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          
            <div style={{ marginTop: '1rem', display: 'flex' }}>
              <h5>Add Custom Field</h5>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Fields
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ backgroundColor: 'dark', marginLeft:"3rem" }}>
                  <Dropdown.Item>Custom Field</Dropdown.Item>
                  <Dropdown.Item>Contact Information</Dropdown.Item>
                  <Dropdown.Item>Address Information</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
    </>
  );
};

export default YourComponent;
