import React from 'react';
import { Row, Col, Card, Nav, Tab, Tabs } from 'react-bootstrap';
import { BarLoader } from 'react-spinners'
import { connect } from 'react-redux';
import Aux from "../../hoc/_Aux";
import SummaryWidget from '../Widgets/SummaryWidget'
import DevicesDataTable from './DevicesDataTable'
import moment from 'moment'

import { fetchDevice } from '../../redux/actions/devices/list'

class Devices extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            activeTab: '1',
            detail: false
        }
    }

    componentWillMount = () => {
        this.props.fetchDevice()
    }

    render() {
        const { activeTab } = this.state
        const { dataDevice, deviceDetail, deviceProgress } = this.props

        return (
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
                                <Card.Title as='h5'>Devices Management</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <DevicesDataTable data={dataDevice} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        dataDevice: state.deviceStore.dataDevice,
        deviceDetail: state.deviceStore.deviceDetail,
        deviceProgress: state.deviceStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchDevice})(Devices);