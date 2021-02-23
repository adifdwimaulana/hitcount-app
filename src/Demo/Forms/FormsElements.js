import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";

class FormsElements extends React.Component {

    render() {

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Task Management</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <h5>Input your tasks here!</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Task 1</Form.Label>
                                                <Form.Control as="select">
                                                    <option>RTGS</option>
                                                    <option>SKNBI</option>
                                                    <option>TTIN</option>
                                                    <option>TTOUT</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Task 2</Form.Label>
                                                <Form.Control as="select">
                                                    <option>RTGS</option>
                                                    <option>SKNBI</option>
                                                    <option>TTIN</option>
                                                    <option>TTOUT</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Task 3</Form.Label>
                                                <Form.Control as="select">
                                                    <option>RTGS</option>
                                                    <option>SKNBI</option>
                                                    <option>TTIN</option>
                                                    <option>TTOUT</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Task 4</Form.Label>
                                                <Form.Control as="select">
                                                    <option>RTGS</option>
                                                    <option>SKNBI</option>
                                                    <option>TTIN</option>
                                                    <option>TTOUT</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Button variant="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Number of transactions</Form.Label>
                                            <Form.Control type="email" placeholder="1" />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Number of transactions</Form.Label>
                                            <Form.Control type="email" placeholder="2" />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Number of transactions</Form.Label>
                                            <Form.Control type="email" placeholder="3" />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Number of transactions</Form.Label>
                                            <Form.Control type="email" placeholder="4" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default FormsElements;
