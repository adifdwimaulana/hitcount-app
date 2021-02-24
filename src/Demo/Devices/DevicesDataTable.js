import React from 'react'
import { Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from 'moment'
import cookie from 'react-cookies'
import Select from 'react-select'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { db } from '../../config/firebaseConfig'

import { fetchDevice } from '../../redux/actions/devices/list'
import { fetchUsers } from '../../redux/actions/users/list'

class DevicesDataTable extends React.Component {
    constructor(props){
        super(props)

        this.state = {  }
    }

    componentWillMount = () => {
        this.props.fetchUsers()
    }

    toggleOpenAdd = () => {
        this.setState({ modalAdd: !this.state.modalAdd })
    }
    
    toggleCloseAdd = () => {
        this.setState({
            name: '',
            counter: 0,
            modalAdd: !this.state.modalAdd
        })
    }

    toggleOpenDetail = (row) => {
        window.location.href += `/${row.id}`
    }

    toggleCloseDetail = () => {
        this.setState({
            data: null,
            modalDetail: !this.state.modalDetail
        })
    }

    toggleOpenAssign = (row) => {
        this.setState({
            data: row,
            selectedUser: {label: row.pic, value: row.pic},
            modalAssign: !this.state.modalAssign
        })
    }

    toggleCloseAssign = () => {
        this.setState({
            data: null,
            selectedUser: null,
            modalAssign: !this.state.modalAssign
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

    customBtnGroup = (props) => {
        return(
            <div>
                <Button onClick={() => this.toggleOpenAdd()} variant="primary"><i className="fa fa-plus"></i>&nbsp;Add New Device</Button>
                { props.exportCSVBtn }
            </div>
        )
    }

    ActionFormatter = (cell, row) => {
        return(
            <div>
                {
                    cookie.load('isAdmin') == "true" ?
                    <div>
                        <Button onClick={() => this.toggleOpenDetail(row)} size="sm" variant="primary"><i className="fa fa-info"></i>Detail</Button>
                        <Button onClick={() => this.toggleOpenAssign(row)} size="sm" variant="warning"><i className="fa fa-user"></i>Assign</Button>
                        <Button onClick={() => this.toggleOpenDelete(row)} size="sm" variant="danger"><i className="fa fa-trash"></i>Delete</Button>
                    </div> :
                    <Button onClick={() => this.toggleOpenDetail(row)} size="sm" variant="primary"><i className="fa fa-info"></i>Detail</Button>
                }
            </div>
        )
    }

    numericSortFunc = (a,b,order) => {
        if (order === 'desc'){
            return Number(b.no) - Number(a.no)
        } else {
            return Number(a.no) - Number(b.no)
        }
    }

    expandableRow = (row) => {
        return false
    }

    dateFormat = (cell, row) => {
        let time = cell.split(' : ')
        return time[0]
    }

    timeFormat = (cell, row) => {
        let time = cell.split(' : ')
        return time[1]
    }

    handleChangUser = (selectedUser) => {
        const { data } = this.state

        this.setState({ selectedUser })
    }

    handleAdd = () => {
        const { name, counter } = this.state
        const { dataDevice } = this.props

        if(dataDevice.filter(x=>x.id.toLowerCase() == name.toLowerCase()).length > 0){
            return toast.error("Device name already registered!")
        } else {
            this.setState({isAdding: true})
            db.ref(`/devices/${name}`).update({
                id: name,
                Counter: counter,
                Time: moment(new Date()).format("YYYY-MM-DD : HH:mm:ss"),
                postingTime: 2,
                readingTime: 200,
                Number: 2147483647,
                assigned: false
            }).then(() => {
                this.setState({isAdding: false})
                this.toggleCloseAdd()
                return toast.success("Device successfully Added")
            }).catch(error => {
                this.setState({isAdding: false})
                return toast.error(error.message)
            })
        }
    }

    handleAssign = () => {
        const { selectedUser, data } = this.state
        const id = data.id

        db.ref(`/users`).once('value', snap => {
            let data = []
            let arr_obj = Object.keys(snap.val()).map(key => ({ [key]: snap.val()[key] }))
            
            arr_obj.forEach((result, index) => {
                let Obj = Object.assign(result[Object.keys(result)], {key: Object.keys(result)[0]})
                data.push(Obj)
            })

            this.setState({isAssigning: true})
            data.forEach((result, index) => {
                if(result.email == selectedUser.label){
                    db.ref(`/devices/${id}`).update({
                        pic: selectedUser.label
                    }).then(() => {
                        this.setState({isAssigning: false})
                        this.toggleCloseAssign()
                        return toast.success("Device assigned successfully!")
                    }).catch(error => {
                        this.setState({isAssigning: false})
                        return toast.error(error.message)
                    })
                }
            })
        })
    }

    handleDelete = () => {
        const { data } = this.state
        const id = data.id

        this.setState({isDeleting: true})
        db.ref(`/devices/${id}`)
            .remove().then(() => {
                this.setState({isDeleting: false})

                this.toggleCloseDelete()
                return toast.success("Device successfully deleted!")
            }).catch(error => {
                this.setState({isDeleting: false})

                return toast.error(error.message)
            })
    }

    showTable = () => {
        const options = {
            sortName: 'no',
            sizePerPageList: [{
                text: '10', value: 10
            },{
                text: '20', value: 20
            },{
                text: '30', value: 30
            }],
            sizePerPage: 30,
            btnGroup: this.customBtnGroup,
            expandBy: 'column',
            noDataText: 'No device(s) found. Please check or input a new device',
        }

        const selectRow = {
            bgColor: '#1de9b6',
            hideSelectColumn: true,
            clickToExpand: false,
        }

        return(
            <BootstrapTable data={this.props.data} version="4" striped hover pagination search searchPlaceholder={"Search by device id or timestamp..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.isExpandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}} >
                <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="no" dataSort csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="5%" searchable={false}>No</TableHeaderColumn>
                <TableHeaderColumn dataField="id" dataSort csvHeader="Device ID" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="15%">Device Name</TableHeaderColumn>
                <TableHeaderColumn dataField="Time" dataSort csvHeader="Date" dataFormat={this.dateFormat} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="10%">Date</TableHeaderColumn>
                <TableHeaderColumn dataField="Time" dataSort csvHeader="Time" dataFormat={this.timeFormat} thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="10%">Time</TableHeaderColumn>
                <TableHeaderColumn dataField="Counter" dataSort csvHeader="Counter" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable>Counter</TableHeaderColumn>
                <TableHeaderColumn dataField="Number" dataSort csvHeader="Number" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false}>Number</TableHeaderColumn>
                <TableHeaderColumn dataField="postingTime" dataSort csvHeader="Posting Time" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="10%">Posting Time</TableHeaderColumn>
                <TableHeaderColumn dataField="readingTime" dataSort csvHeader="Reading Time" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="10%">Reading Time</TableHeaderColumn>
                <TableHeaderColumn dataAlign="center" dataField='action' export={false} dataFormat={ this.ActionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 400 } } tdStyle={ { whiteSpace: 'normal', width: 400 } } searchable={false} expandable={ false }>Action</TableHeaderColumn>
            </BootstrapTable>
        )
    }

    render(){
        const { modalAdd, modalAssign, modalDelete, isAdding, isAssigning, isDeleting, name, counter, data, selectedUser } = this.state
        const { users, userOptions, userProgress } = this.props

        return(
            <div>
                {this.showTable()}

                {/* Modal Add */}
                <Modal show={modalAdd} onHide={this.toggleCloseAdd}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Device</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Device Name</Form.Label>
                                <Form.Control type="text" placeholder="Device-01" onChange={e => this.setState({name: e.target.value})} value={name} autoComplete="off" required />
                            </Form.Group>

                            <Form.Group controlId="counter">
                                <Form.Label>Current Counter</Form.Label>
                                <Form.Control type="number" placeholder="0-255" onChange={e => this.setState({counter: e.target.value})} value={counter} autoComplete="off" required />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="success" size="sm" disabled={!name || !counter || isAdding} onClick={this.handleAdd}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Assign */}
                <Modal show={modalAssign} onHide={this.toggleCloseAssign}>
                    <Modal.Header closeButton>
                    <Modal.Title>Assign Device</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="pic">
                                <Form.Label>Assigned to</Form.Label>
                                <Select className="input-select" options={userOptions} onChange={this.handleChangUser} value={selectedUser} isClearable />
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
                </Modal>

                {/* Modal Delete */}
                <Modal show={modalDelete} onHide={this.toggleCloseDelete}>
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
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataDevice: state.deviceStore.dataDevice,
        deviceDetail: state.deviceStore.deviceDetail,
        deviceProgress: state.deviceStore.inProgress,

        users: state.userStore.users,
        userOptions: state.userStore.userOptions,
        userProgress: state.userStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchDevice, fetchUsers})(DevicesDataTable)