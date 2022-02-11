import React, { Component } from "react";
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { serverUrl } from "../config.json";

export default class createCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleSubmit(event) {
    fetch(serverUrl + "v1/sections", {
      method: "POST",
      body: JSON.stringify({
        name: document.getElementById("category").value,
      }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accsess_token"),
        accept: "*/*",
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      if (response.status !== 200) {
        alert(response.status);
      } else {
        document.getElementById("category").value = "";
      }
    });
    this.setState({ show: true });

    event.preventDefault();
  }
  componentDidMount() {
    document.title = "Створення Категорії";
  }

  render() {
    const { show } = this.state;
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={"/"}>Головна</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={"/management/category"}>Керування</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Створення Категорії</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col sm={4}>
            <h3>Створити Катеогорію</h3>
          </Col>
        </Row>
        <br></br>

        <FormGroup name="form1">
          <Form.Row>
            <Form.Label>Назва Категорії</Form.Label>
            <Form.Control
              id="category"
              type="text"
              placeholder="Назвіть категорію"
            />
          </Form.Row>
        </FormGroup>
        <Row>
          <Col sm={1}>
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>
              Створити
            </Button>
          </Col>
        </Row>
        <Modal
          size="sm"
          show={show}
          onHide={() => this.setState({ show: false })}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Категорію створено
            </Modal.Title>
          </Modal.Header>
        </Modal>
      </Container>
    );
  }
}