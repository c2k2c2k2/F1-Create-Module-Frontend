import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Button } from "reactstrap";

const Address = () => {
  const [moduleList, setModuleList] = useState([]); // Define blocks state

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/modules`);
        const data = await res.json();

        let mod = data.data.find((item) => item.name == "Address");
        setModuleList(mod);
      } catch (err) {
        throw new Error(err);
      }
    };

    fn();
  }, []);

  return (
    <>
      <Card style={{ width: "100%", height: "100vh", marginTop: "5rem" }}>
        <h3>Address</h3>
        <Form className="p-5">
          {moduleList?.blocks?.map((item) => (
            <>
              <h5>{item.name}</h5>
              {item.fields?.map((field) => (
                <Form.Group>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control type={field.type} />
                </Form.Group>
              ))}
            </>
          ))}

          <Button type="button" variant="primary">
            Save
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default Address;
