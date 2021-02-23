import React from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import moment from 'moment'

class TeamForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            type: this.props.type,
            isLoading: this.props.isLoading,
            name: this.props.defaultName,
            description: this.props.defaultDescription
        }
    }

    render(){
        const { name, description, isLoading, type } = this.state
        return(
            <div>
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control type="text" placeholder="Team Name" onChange={this.handleChangeName} value={name} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" onChange={this.handleChangeDescription} value={description} autoComplete="off" required />
                    </Form.Group>
                    <Form.Group controlId="checkbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                </Form>
            </div>
        )
    }
}