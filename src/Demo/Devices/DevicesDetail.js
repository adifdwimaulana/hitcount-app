import React from 'react'
import { Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import moment from 'moment'
import Aux from '../../hoc/_Aux'
import SummaryWidget from '../Widgets/SummaryWidget'
import { BarLoader } from 'react-spinners'
import { connect } from 'react-redux'
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'

import { fetchDevice, fetchDeviceRange } from '../../redux/actions/devices/list'

class DevicesDetail extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            data: [],
            reading: [],
            startDate: moment(new Date(new Date() - 1800000)),
			endDate: moment(new Date()),
			maxDate: moment(new Date()),
        }
    }

    componentWillMount = () => {
        this.props.fetchDevice()
        this.props.fetchDevice(this.props.match.params.id)
    }

    handleChangeDateTime = (start, end) => {
        this.props.fetchDeviceRange(this.props.match.params.id, start, end)
    }

    customBtnGroup = (props) => {
        const  { startDate, endDate, maxDate } = this.state
        return(
            <div style={{display: 'flex', flexDirection: 'row'}}>
                { props.exportCSVBtn }
                <Button onClick={() => window.location.reload()} variant="primary"><i className="fa fa-clock-o"></i>&nbsp;Real Time Reading</Button>

                <DateTimeRangeContainer
                    ranges
                    start={startDate}
                    end={endDate}
                    local={{"format": "DD-MM-YYYY HH:mm", "sundayFirst": false}}
                    maxDate={maxDate}
                    applyCallback={this.handleChangeDateTime}
                    selectingFrom= 'Selecting From'
                    selectingTo= 'Selecting To'
                    smartMode
                    pastSearchFriendly
                >
                    <Form.Control type="text" name="text-input" id="datetimepicker" placeholder="" value={moment(startDate).format('DD/MM/YYYY HH:mm') + ' - ' + moment(endDate).format('DD/MM/YYYY HH:mm')} autoComplete="off" />
                </DateTimeRangeContainer>
            </div>
        )
    }

    showTable = () => {
        const { deviceDetail } = this.props

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
            noDataText: 'No log(s) recorded.',
            onSearchChange: this.onSearchChange,
        };
        const selectRow = {
            bgColor: '#e4e5e6',
            hideSelectColumn: true,
            clickToExpand: true,
            onSelect: this.onRowSelect
        };
        //eslint-disable-next-line
        return (
            <BootstrapTable data={deviceDetail} version="4" striped hover pagination search searchPlaceholder={"Search by device id or timestamp..."} edit options={options} selectRow={selectRow} exportCSV={true} csvFileName={this.fileNameFormat} expandableRow={this.isExpandableRow} expandComponent={this.expandComponent} expandColumnOptions={{expandColumnVisible: false}} >
                <TableHeaderColumn dataField="id" isKey dataSort csvHeader="Sensor ID" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="no" dataSort csvHeader="No" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="5%">No</TableHeaderColumn> 
                    <TableHeaderColumn dataField="id" dataSort csvHeader="Device ID" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="18%">Device Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="date" dataSort csvHeader="Date" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="18%">Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="timestamp" dataSort csvHeader="Time" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="18%">Time</TableHeaderColumn>
                    <TableHeaderColumn dataField="counter" dataSort csvHeader="Counter" thStyle={ { whiteSpace: 'normal' } } tdStyle={ { whiteSpace: 'normal' } } width="18%">Counter</TableHeaderColumn>
            </BootstrapTable>
        )
    }

    render(){
        const { dataDevice, count, deviceProgress } = this.props

        return(
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Total Device(s)" value={dataDevice ? dataDevice.length : 0} color="blue" icon="icon-cast" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Active Device(s)" value={dataDevice ? dataDevice.length : 0} color="green" icon="icon-cast" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Inactive Device(s)" value={0} color="red" icon="icon-cast" />
                    </Col>
                </Row>

                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Device Log {count ? 'Total Count: ' + count : null}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {
                                    !deviceProgress ? this.showTable() : <center><BarLoader color={'#123abc'} loading={deviceProgress} /></center>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataDevice: state.deviceStore.dataDevice,
        deviceDetail: state.deviceStore.deviceDetail,
        count: state.deviceStore.count,
        deviceProgress: state.deviceStore.inProgress,
    }
}

export default connect(mapStateToProps, {fetchDevice, fetchDeviceRange})(DevicesDetail)