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

class ApprovalDataTable extends React.Component {
    constructor(props){
        super(props)

        this.state = {  }
    }

    componentWillMount = () => {
        
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

    toggleOpenAccept = (row) => {
        this.setState({
            data: row,
            modalAccept: !this.state.modalAccept
        })
    }

    toggleCloseAccept = () => {
        this.setState({
            data: null,
            modalAccept: !this.state.modalAccept
        })
    }

    toggleOpenReject = (row) => {
        this.setState({
            data: row,
            modalReject: !this.state.modalReject
        })
    }

    toggleCloseReject = () => {
        this.setState({
            data: null,
            modalReject: !this.state.modalReject
        })
    }

    handleAccept = () => {

    }

    handleReject = () => {

    }

    ActionFormatter = (cell, row) => {
        return(
            <div>
                <Button onClick={() => this.toggleOpenDetail(row)} size="sm" variant="primary"><i className="fa fa-info"></i>Detail</Button>
                <Button onClick={() => this.toggleOpenAccept(row)} size="sm" variant="success"><i className="fa fa-check"></i>Accept</Button>
                <Button onClick={() => this.toggleOpenReject(row)} size="sm" variant="danger"><i className="fa fa-ban"></i>Reject</Button>
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

    dateFormatter = (cell) => {
        return moment(cell).format('DD-MM-YYYY')
    }

    expandableRow = (row) => {
        return false
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
            noDataText: 'No task(s) found. Please check or input a new task',
        }

        const selectRow = {
            bgColor: '#1de9b6',
            hideSelectColumn: true,
            clickToExpand: false,
        }

        return(
                <BootstrapTable data={data} version="4" striped hover pagination search searchPlaceholder={"Search by name, type, or applicant..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.expandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}}>
                    <TableHeaderColumn dataField="id" isKey dataSort csvHeader="ID" hidden searchable={false}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="no" dataSort sortFunc={this.numericSortFunc.bind(this)} csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="5%" searchable={false}>No</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort csvHeader="Name" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="15%">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="type" dataSort csvHeader="Type" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="20%">Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="applicant" dataSort csvHeader="Applicant" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="15%">Applicant</TableHeaderColumn>
                    <TableHeaderColumn dataField="date" dataFormat={this.dateFormatter.bind(this)} dataSort csvHeader="Date" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="15%">Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="amount" dataSort csvHeader="Amount" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="15%">Amount</TableHeaderColumn>
                    <TableHeaderColumn dataAlign="center" dataField='action' export={false} dataFormat={ this.ActionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 400 } } tdStyle={ { whiteSpace: 'normal', width: 400 } } searchable={false} expandable={ false }>Action</TableHeaderColumn>
                </BootstrapTable>
        )
    }

    render(){
        const { modalDetail, modalAccept, modalReject } = this.state

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
                    <Button variant="secondary" size="sm" className="mr-auto" onClick={this.toggleCloseAccept}>
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

                {/* Modal Accept */}
                <Modal show={modalAccept} onHide={this.toggleCloseAccept}>
                    <Modal.Header closeButton>
                    <Modal.Title>Accept Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseAccept}>
                        Close
                    </Button>
                    <Button variant="success" size="sm" onClick={this.handleAccept}>
                        Accept
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Reject */}
                <Modal show={modalReject} onHide={this.toggleCloseReject}>
                    <Modal.Header closeButton>
                    <Modal.Title>Reject Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseReject}>
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

export default ApprovalDataTable