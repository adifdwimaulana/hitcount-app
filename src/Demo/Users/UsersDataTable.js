import React from 'react'
import { Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from 'moment'
import { BarLoader } from 'react-spinners'
import cookie from 'react-cookies'
import Select from 'react-select'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { db, auth } from '../../config/firebaseConfig'

class UsersDataTable extends React.Component {
    constructor(props){
        super(props)

        this.state = { 
            role: null
         }
    }

    toggleOpenAdd = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    toggleCloseAdd = () => {
        this.setState({
            modalAdd: !this.state.modalAdd,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: null
        })
    }

    toggleOpenChangePassword = () => {
        this.setState({
            modalChangePassword: !this.state.modalChangePassword
        })
    }

    toggleOpenChangePassword = () => {
        this.setState({
            modalChangePassword: !this.state.modalChangePassword,
            password: '',
            confirmPassword: ''
        })
    }

    toggleOpenDelete = (row) => {
        this.setState({
            data: row,
            modalDelete: !this.state.modalDelete
        })
    }

    toggleCloseDelete = () => {
        this.setState({
            data: null,
            modalDelete: !this.state.modalDelete
        })
    }

    ActionFormatter = (cell, row) => {
        //eslint-disable-next-line
        console.log(row)
        return(
            <div>
                {
                    cookie.load('isAdmin') == 'true' ? 
                    <div>
                        {
                            cookie.load('email') != row.email ? <Button className="mr-2" onClick={() => this.toggleOpenDelete(row)} size="sm" variant="danger"><i className="fa fa-trash"></i> Delete</Button> : null 
                        }
                        {
                            cookie.load('email') == row.email ? <Button className="mr-2" onClick={() => this.toggleOpenChangePassword(row)} size="sm" variant="warning"><i className="fa fa-key"></i> Reset Password</Button> : null 
                        }
                    </div> : <div>
                        {
                            cookie.load('email') == row.email ? <Button className="mr-2" onClick={() => this.toggleOpenChangePassword(row)} size="sm" variant="warning"><i className="fa fa-key"></i> Reset Password</Button> : null 
                        }
                    </div>
                }
            </div>
        )
    }

    isAdmin = (cell, row) => {
        if(cell == true){
            return 'Admin'
        } else {
            return 'User'
        }
    }

    customBtnGroup = (props) => {
        return(
            <div>
                <Button onClick={() => this.toggleOpenAdd()} variant="primary"><i className="fa fa-plus"></i>&nbsp;Add New Account</Button>
                { props.exportCSVBtn }
            </div>
        )
    }

    showTable = () => {
        const { data } = this.props
        const options = {
            sizePerPageList: [{
                text: '10', value: 10
            },{
                text: '20', value: 20
            },{
                text: '30', value: 30
            }],
            sizePerPage: 30,
            sortName: 'no',
            btnGroup: this.customBtnGroup,
            noDataText: 'No user(s) registered. Please check or register a new user.',
            searchPlaceholder:'Please Find'
        }
        return (
            <BootstrapTable data={data} version="4" striped hover pagination search searchPlaceholder='search by email, name, or role' edit options={options} exportCSV={true} csvFileName={this.fileNameFormat} >
                <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="no" dataSort csvHeader="No" thStyle={ { whiteSpace: 'normal', width: 100 } } tdStyle={ { whiteSpace: 'normal', width: 100 } } searchable={false} width='7%'>Number</TableHeaderColumn>
                <TableHeaderColumn dataField="admin" dataFormat={this.isAdmin} dataSort csvHeader="Role" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width='5%'>Role</TableHeaderColumn>
                <TableHeaderColumn dataField="email" dataSort csvHeader="Email" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width='15%'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField="firstName" dataSort csvHeader="First Name" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width='13%'>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField="lastName" dataSort csvHeader="Last Name" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width='13%'>Last Name</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField='action' export={false} dataFormat={ this.ActionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal',width: 400 } } tdStyle={ { whiteSpace: 'normal',width: 400 } } searchable={false}>Action</TableHeaderColumn>
            </BootstrapTable>
        )
    }

    handleChangeRole = (role) => {
        this.setState({ role })
    }

    handleAdd = () => {
        const { firstName, lastName, role, email, password } = this.state
        let admin

        if(role.label == 'Admin'){
            admin = true
        } else {
            admin = false
        }

        this.setState({isAdding: true})
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.ref(`/users/${auth.currentUser.uid}`).update({
                    email,
                    firstName,
                    lastName,
                    admin,
                }).then(() => console.log("Push Data Success!"))
                this.setState({isAdding: false})
                this.toggleCloseAdd()
                
                return toast.success("User Successfully Added")
            }).catch(error => {
                this.setState({isAdding: false})

                return toast.error(error.message)
            })
    }

    render(){
        const { firstName, lastName, email, password, confirmPassword, role, 
                modalAdd, modalChangePassword, modalDelete, isAdding, isChanging, isDeleting } = this.state
        return(
            <div>
                {this.showTable()}

                {/* Modal Add */}
                <Modal show={modalAdd} onHide={this.toggleCloseAdd}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="John" onChange={e => this.setState({firstName: e.target.value})} value={firstName} autoComplete="off" required />
                            </Form.Group>

                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Doe" onChange={e => this.setState({lastName: e.target.value})} value={lastName} autoComplete="off" required />
                            </Form.Group>

                            <Form.Group controlId="lastName">
                                <Form.Label>Role</Form.Label>
                                <Select className="input-select" options={[{label: 'Admin', value: 'Admin'}, {label: 'User', value: 'User'}]} onChange={this.handleChangeRole} value={role} isClearable />
                            </Form.Group>
                            <hr />
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({email: e.target.value})} value={email} autoComplete="off" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})} value={password} autoComplete="off" />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => this.setState({confirmPassword: e.target.value})} value={confirmPassword} autoComplete="off" />
                                <Form.Text className="text-danger">
                                    { password != "" && password !== confirmPassword ? "Password doesn't match!" : "" }
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="success" size="sm" disabled={!firstName || !lastName || !email || !password ||!confirmPassword || isAdding} onClick={this.handleAdd}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Assign */}
                {/* <Modal show={modalAssign} onHide={this.toggleCloseAssign}>
                    <Modal.Header closeButton>
                    <Modal.Title>Assign Device</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="pic">
                                <Form.Label>Assigned to</Form.Label>
                                <Select options={userOptions} onChange={this.handleChangUser} value={selectedUser} isClearable />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseAssign}>
                        Close
                    </Button>
                    <Button variant="success" size="sm" disabled={!selectedUser || isAssigning} onClick={this.handleAssign}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal> */}

                {/* Modal Delete */}
                {/* <Modal show={modalDelete} onHide={this.toggleCloseDelete}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete {data ? data.id : null}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure want to delete this device ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="danger" size="sm" disabled={isDeleting} onClick={this.handleDelete}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        )
    }
}

export default UsersDataTable