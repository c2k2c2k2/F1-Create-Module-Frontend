import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Card,
  Container,
  Dropdown,
  Row,
  Col,
  FormControl,
  Form,
} from "react-bootstrap";
import { getModules } from "services/api.service";
import { updateBlockDataById } from "services/api.service";
import { updateBlock } from "services/api.service";

const YourComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFieldModal, setFieldModal] = useState(false);
  const [addAfterParam, setAddAfterParam] = useState("");
  const [blockName, setBlockName] = useState("");
  const [moduleName, setModuleName] = useState(null);
  const [blocks, setBlocks] = useState([]); // Define blocks state
  const [moduleList, setModuleList] = useState([]); // Define blocks state
  const [customFieldName, setCustomFieldName] = useState("");
  const [selectedField, setSelectedField] = useState(null);

  const updateBlock = useMutation({
    mutationFn: updateBlockDataById,
    onSuccess: (data) => {
      console.log("update block", data);
    },
    onError: (err) => {
      alert(err);
    },
  });

  console.log(selectedField);

  const fieldForm = useFormik({
    initialValues: {
      type: "",
      label: "",
      isMandatory: false,
      defaultValue: "",
    },
    onSubmit: async (data) => {
      data = { ...data };
      console.log(data);
      try {
        const createField = await fetch(
          `http://localhost:8000/api/v1/custom-fields`,
          {
            method: "POST",
            body: JSON.stringify({ ...data, block: selectedField._id }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const created = await createField.json();

        if (created.status == "success") {
          const updateBlock = await fetch(
            `http://localhost:8000/api/v1/blocks/${selectedField._id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                fields: [...selectedField.fields, created.data._id],
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const updatedBlock = await updateBlock.json();

          if (updatedBlock.status == "success") {
            setSelectedField(null);
            setFieldModal(false);
          } else {
            alert(JSON.stringify(updatedBlock.message));
            return;
          }
        } else {
          alert(JSON.stringify(created.message));
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  });
  const blockForm = useFormik({
    initialValues: {
      name: "",
      addTo: "",
      fields: [],
    },
    onSubmit: async (data) => {
      data = { ...data };
      try {
        const createBlock = await fetch(`http://localhost:8000/api/v1/blocks`, {
          method: "POST",
          body: JSON.stringify({ ...data, module: moduleName._id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const created = await createBlock.json();

        console.log(created);
        if (created.status == "success") {
          const response = await fetch(
            `http://localhost:8000/api/v1/modules/${moduleName._id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                blocks: [...moduleName.blocks, created.data._id],
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const res = await response.json();

          if (res.status == "success") {
            setShowModal(false);
          }
        } else {
          alert(JSON.stringify(created.message));
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/modules`);
        const data = await res.json();
        if (moduleName == null || selectedField == null) {
          setModuleList(data.data);
        } else {
          let mod = moduleList.find((item) => item._id == moduleName._id);
          setModuleName(mod);
        }
      } catch (err) {
        throw new Error(err);
      }
    };

    fn();
  }, [showModal, showFieldModal]);

  return (
    <>
      <Card style={{ width: "100%", height: "100vh", marginTop: "5rem" }}>
        <Container fluid>
          <Row style={{ alignItems: "center" }}>
            <p style={{ padding: "10px", margin: "auto 0" }}>Module</p>
            <Dropdown
              onSelect={(e) => {
                // console.log("object,", e);
                setModuleName(JSON.parse(e));
              }}
            >
              <Dropdown.Toggle
                size="sm"
                variant={moduleName == "" ? "success" : "primary"}
                id="dropdown-basic"
              >
                {moduleName == null ? `Dropdown Button` : moduleName.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {moduleList.map((item) => (
                  <Dropdown.Item eventKey={JSON.stringify(item)}>
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {moduleName != null && (
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

        <Container style={{ paddingTop: "50px" }} fluid>
          <Row>
            <p
              style={{
                fontWeight: "500",
                padding: "0 20px",
                textTransform: "uppercase",
              }}
            >
              {moduleName?.name}
            </p>
          </Row>
          {moduleName?.blocks.length > 0 &&
            moduleName?.blocks.map((block) => (
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
                        setSelectedField(block);
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
                      <div className="w-100 d-flex justify-between">
                        <p className="m-3">
                          Field Label: <strong>{item.label}</strong>
                        </p>
                        <p className="m-3">
                          Type: <strong>{item.type}</strong>
                        </p>
                        <p className="m-3">
                          Mandatory:
                          <strong>{item.isMandatory ? "true" : "false"}</strong>
                        </p>
                      </div>
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
        <Form onSubmit={blockForm.handleSubmit}>
          <Modal.Body>
            <Form.Group className="my-3">
              <Form.Label>Block Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter block Name"
                name="name"
                onChange={blockForm.handleChange}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Add After</Form.Label>
              <Form.Select
                size="sm"
                className="mx-3 p-2 w-50"
                name="addTo"
                onChange={blockForm.handleChange}
              >
                <option>Select ... </option>
                <option>User</option>
                <option>Admin</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showFieldModal} onHide={() => setFieldModal(false)}>
        <Modal.Header>
          <Modal.Title>Add Field</Modal.Title>
        </Modal.Header>
        <Form onSubmit={fieldForm.handleSubmit}>
          <Modal.Body className="p-4">
            <Form.Group className="mb-2">
              <Form.Label>Field Label</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                name="label"
                placeholder="Enter label name"
                onChange={fieldForm.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Field Type*</Form.Label>
              <Form.Select
                size="sm"
                aria-label="Default select example"
                className="m-3 p-2 rounded"
                name="type"
                onChange={fieldForm.handleChange}
              >
                <option className="p-3 text-secondary">
                  Open this select menu
                </option>
                <option className="p-3" value="text">
                  Text
                </option>
                <option className="p-3" value="textarea">
                  TextArea
                </option>
                <option className="p-3" value="checkbox">
                  Checkbox
                </option>
                <option className="p-3" value="radio">
                  Radio
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Default Value</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                name="defaultValue"
                placeholder="Enter Default Value"
                onChange={fieldForm.handleChange}
              />
            </Form.Group>
            <div className="bg-light py-3 px-2 my-3 rounded">
              <p className="text-sm uppercase ">
                Enable/Disable field properties:
              </p>

              <Form.Group className="mx-4">
                <Form.Check
                  name="isMandatory"
                  onChange={fieldForm.handleChange}
                />
                <Form.Label>Mandatory Field</Form.Label>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              // onClick={() => {
              //   const block = blocks.filter(
              //     (item) => item.name == selectedField
              //     )[0];
              //     const newFieldsArr = [...block.fields, customFieldName];
              //     block.fields = newFieldsArr;
              //     setBlocks(_.unionBy(blocks, [block], "name"));
              //     setFieldModal(false);
              //   setSelectedField(null);
              //   setCustomFieldName("");
              // }}
            >
              Save
            </Button>
            <Button variant="secondary" onClick={() => setFieldModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default YourComponent;
