import React from 'react'
import { Row, Col, Card, Nav, Tab, Tabs } from 'react-bootstrap';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Aux from '../../hoc/_Aux'
import SummaryWidget from '../Widgets/SummaryWidget'
import TeamDataTable from './TeamDataTable'

import { fetchDepartment } from '../../redux/actions/departments/list'

class Team extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            activeTab: '1'
        }
    }

    componentWillMount = () => {
        this.props.fetchDepartment()
        this.props.fetchDepartment({ status: 2 })
    }

    render(){
        const { activeDepartment, inactiveDepartment, activeDepartmentCount, inactiveDepartmentCount } = this.props

        return(
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Total Team(s)" value={activeDepartmentCount + inactiveDepartmentCount} color="blue" icon="icon-users" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Active Team(s)" value={activeDepartmentCount} color="green" icon="icon-users" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Inactive Team(s)" value={inactiveDepartmentCount} color="red" icon="icon-users" />
                    </Col>
                </Row>

                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Management Team</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" style={{ margin: 0 }}>
                                    <Tab eventKey="1" title="Active Team(s)">
                                        <TeamDataTable data={activeDepartment} />
                                    </Tab>
                                    <Tab eventKey="2" title="Inactive Team(s)">
                                        <TeamDataTable data={inactiveDepartment} />
                                    </Tab>
                                </Tabs>
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
        activeDepartment: state.departmentStore.activeDepartment,
        inactiveDepartment: state.departmentStore.inactiveDepartment,
        departments: state.departmentStore.departments,
        activeDepartmentCount: state.departmentStore.activeDepartmentCount,
        inactiveDepartmentCount: state.departmentStore.inactiveDepartmentCount,
        departmentsCount: state.departmentStore.departmentsCount,
        departmentProgress: state.departmentStore.inProgress,
    }
}

export default connect(mapStateToProps, {fetchDepartment})(Team)