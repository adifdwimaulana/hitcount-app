import React from 'react';
import { Row, Col, Card, Nav, Tab, Tabs } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import SummaryWidget from '../Widgets/SummaryWidget'
import ApprovalDataTable from './ApprovalDataTable'
import moment from 'moment'

class Approval extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            activeTab: '1'
        }
    }

    componentWillMount = () => {
        
    }

    render() {
        const { activeTab } = this.state
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Active Task" value="45" color="blue" icon="icon-file-text" link="/report/task" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Approved Task" value="31" color="green" icon="icon-file-text" link="/report/task" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Rejected Task" value="14" color="red" icon="icon-file-text" link="/report/task" />
                    </Col>
                </Row>

                <Row>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Recent Tasks</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" style={{ margin: 0 }}>
                                    <Tab eventKey="1" title="Active Task(s)">
                                        <ApprovalDataTable />
                                    </Tab>
                                    <Tab eventKey="2" title="Approved Task(s)">
                                        {/* <ApprovalDataTable /> */}
                                    </Tab>
                                    <Tab eventKey="3" title="Rejected Task(s)">
                                        {/* <ApprovalDataTable /> */}
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Approval;