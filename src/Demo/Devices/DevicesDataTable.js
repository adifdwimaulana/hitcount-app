import React from 'react'
import { Row, Col, Card, Table, Button, Modal } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from 'moment'
import { connect } from 'react-redux'

const data = [
    {
        id: 1,
        no: 1,
        name: "Adif Dwi Maulana",
        type: "Penerbitan",
        applicant: "Bank Mandiri",
        date: new Date(),
        amount: "15.000.000",
    },
    {
        id: 2,
        no: 2,
        name: "Edi Guerero",
        type: "Penerbitan",
        applicant: "Bank Mandiri",
        date: new Date(),
        amount: "15.000.000",
    },
    {
        id: 3,
        no: 3,
        name: "Farhan Arif",
        type: "Penerbitan",
        applicant: "Bank Mandiri",
        date: new Date(),
        amount: "15.000.000",
    },
    {
        id: 4,
        no: 4,
        name: "Dika Pratama",
        type: "Penerbitan",
        applicant: "Bank Mandiri",
        date: new Date(),
        amount: "15.000.000",
    }
]

class DevicesDataTable extends React.Component {
    constructor(props){
        super(props)

        this.state = {  }
    }

    componentWillMount = () => {
        
    }

    toggleOpenAdd = () => {
        this.setState({ modalAdd: !this.state.modalAdd })
    }
    
    toggleCloseAdd = () => {
        this.setState({ modalAdd: !this.state.modalAdd })
    }

    toggleOpenDetail = (row) => {
        this.setState({
            data: row,
            modalDetail: !this.state.modalDetail
        })
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
            modalAssign: !this.state.modalAssign
        })
    }

    toggleCloseAssign = () => {
        this.setState({
            data: null,
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

    handleAccept = () => {

    }

    handleReject = () => {

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
                <Button onClick={() => this.toggleOpenDetail(row)} size="sm" variant="primary"><i className="fa fa-info"></i>Detail</Button>
                <Button onClick={() => this.toggleOpenAssign(row)} size="sm" variant="warning"><i className="fa fa-user"></i>Assign</Button>
                <Button onClick={() => this.toggleOpenDelete(row)} size="sm" variant="danger"><i className="fa fa-trash"></i>Delete</Button>
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

    indexN = (cell, row, enumObject, index) => {
        return (<div>{index+1}</div>) 
    }

    dateFormat = (cell, row) => {
        let time = cell.split(' : ')
        return time[0]
    }

    timeFormat = (cell, row) => {
        let time = cell.split(' : ')
        return time[1]
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
                <TableHeaderColumn dataField="any" dataSort dataFormat={this.indexN} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="5%" searchable={false}>No</TableHeaderColumn>
                <TableHeaderColumn dataField="id" dataSort csvHeader="Device ID" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="15%">Device ID</TableHeaderColumn>
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
        const { modalDetail, modalAssign, modalDelete } = this.state

        return(
            <div>
                {this.showTable()}

                {/* Modal Detail */}
                <Modal show={modalDetail} onHide={this.toggleCloseDetail}>
                    <Modal.Header closeButton>
                    <Modal.Title>Task Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" className="mr-auto" onClick={this.toggleCloseAssign}>
                        Close
                    </Button>
                    <Button variant="danger" size="sm" onClick={this.handleReject}>
                        Reject
                    </Button>
                    <Button variant="success" size="sm" onClick={this.handleAccept}>
                        Accept
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Assign */}
                <Modal show={modalAssign} onHide={this.toggleCloseAssign}>
                    <Modal.Header closeButton>
                    <Modal.Title>Accept Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseAssign}>
                        Close
                    </Button>
                    <Button variant="success" size="sm" onClick={this.handleAccept}>
                        Accept
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Delete */}
                <Modal show={modalDelete} onHide={this.toggleCloseDelete}>
                    <Modal.Header closeButton>
                    <Modal.Title>Reject Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseDelete}>
                        Close
                    </Button>
                    <Button variant="danger" size="sm" onClick={this.handleReject}>
                        Reject
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default DevicesDataTable