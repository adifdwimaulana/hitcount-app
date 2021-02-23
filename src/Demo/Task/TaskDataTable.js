import React from 'react'
import { Row, Col, Card, Table, Button, Modal } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from 'moment'
import { connect } from 'react-redux'
import { BarLoader } from 'react-spinners'
import TaskForm from './Forms'

import { fetchTask } from '../../redux/actions/tasks/list'

class TaskDataTable extends React.Component {
    constructor(props){
        super(props)

        this.state = {  }
    }

    toggleOpenAdd = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    toggleCloseAdd = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    toggleOpenEdit = (row) => {
        this.setState({
            data: row,
            modalEdit: !this.state.modalEdit
        })
    }

    toggleCloseEdit = () => {
        this.setState({
            data: null,
            modalEdit: !this.state.modalEdit
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
        return(
            <div>
                <Button onClick={() => this.toggleOpenEdit(row)} size="sm" variant="success"><i className="fa fa-pencil"></i>Edit</Button>
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

    dateFormatter = (cell) => {
        return moment(cell).format('DD-MM-YYYY')
    }

    userFormatter = (cell) => {
        return cell.name
    }

    typeFormatter = (cell) => {
        return cell.name
    }

    numberFormatter = (cell, row) => {
        
    }

    expandableRow = (row) => {
        return false
    }

    customBtnGroup = () => {
        return(
            <div>
                <Button onClick={() => this.toggleOpenAdd()} size="sm" variant="primary"><i className="fa fa-plus"></i>&nbsp;Add New Task</Button>
                {/* { props.exportCSVBtn } */}
            </div>
        )
    }

    showTable = () => {
        const { data } = this.props
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
                    <TableHeaderColumn dataField="user" dataFormat={this.userFormatter.bind(this)} dataSort csvHeader="Name" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="15%">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="type" dataFormat={this.typeFormatter.bind(this)} dataSort csvHeader="Type" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="20%">Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="applicant" dataSort csvHeader="Applicant" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="15%">Applicant</TableHeaderColumn>
                    <TableHeaderColumn dataField="date" dataFormat={this.dateFormatter.bind(this)} dataSort csvHeader="Date" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable width="15%">Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="amount" dataSort csvHeader="Amount" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } searchable={false} width="15%">Amount</TableHeaderColumn>
                    <TableHeaderColumn dataAlign="center" dataField='action' export={false} dataFormat={ this.ActionFormatter.bind(this) } thStyle={ { whiteSpace: 'normal', width: 400 } } tdStyle={ { whiteSpace: 'normal', width: 400 } } searchable={false} expandable={ false }>Action</TableHeaderColumn>
                </BootstrapTable>
        )
    }

    handleAdd = () => {

    }

    handleEdit = () => {

    }

    handleDelete = () => {

    }

    render(){
        const { modalAdd, modalEdit, modalDelete } = this.state
        return(
            <div>
                {this.showTable()}

                {/* Modal Add */}
                <Modal show={modalAdd} onHide={this.toggleCloseAdd}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TaskForm />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={this.toggleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" size="sm" onClick={this.handleAdd}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeTask: state.taskStore.activeTask,
        approvedTask: state.taskStore.approvedTask,
        rejectedTask: state.taskStore.rejectedTask,
        activeTaskCount: state.taskStore.activeTaskCount,
        approvedTaskCount: state.taskStore.approvedTaskCount,
        rejectedTaskCount: state.taskStore.rejectedTaskCount,
        taskProgress: state.taskStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchTask})(TaskDataTable)