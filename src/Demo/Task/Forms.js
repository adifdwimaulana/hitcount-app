import React from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import moment from 'moment'

class TaskForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            type: this.props.type,
            isLoading: this.props.isLoading,
            date: this.props.defaultDate,
            transaction: this.props.defaultTransaction
        }
    }

    handleChangeDate = (e) => {

    }

    handleChangeTransaction = (e) => {

    }

    checkEmpty = () => {

    }

    checkForm = () => {
        
    }

    render(){
        const { date, transaction } = this.state
        return(
            <div>
                <Form>
                    <Form.Group controlId="date">
                        <Form.Label>Transaction Date</Form.Label>
                        <Form.Control type="date" placeholder="date" onChange={e => this.setState({date: e.target.value})} value={date} max={moment(new Date()).format('YYYY-MM-DD')} autoComplete="off" required />
                    </Form.Group>

                    <Form.Group controlId="transactionId">
                        <Form.Label>Transaction ID</Form.Label>
                        <Form.Control type="text" placeholder="Transaction ID" onChange={e => this.setState({transaction: e.target.value})} value={transaction} autoComplete="off" required />
                    </Form.Group>
                    <Form.Group controlId="checkbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default TaskForm