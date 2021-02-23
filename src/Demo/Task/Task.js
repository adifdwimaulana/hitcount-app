import React from 'react'
import { Row, Col, Card, Nav, Tab, Tabs } from 'react-bootstrap';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import Aux from '../../hoc/_Aux'
import SummaryWidget from '../Widgets/SummaryWidget'
import TaskDataTable from './TaskDataTable'

import { fetchTask } from '../../redux/actions/tasks/list'

class Task extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            activeTab: '1'
        }
    }

    componentWillMount = () => {
        this.props.fetchTask()
        this.props.fetchTask({ status: 2 })
        this.props.fetchTask({ status: 3 })
    }
    
    render(){
        const { activeTask, approvedTask, rejectedTask, activeTaskCount, approvedTaskCount, rejectedTaskCount, taskProgress } = this.props

        return(
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Active Task(s)" value={activeTaskCount} color="blue" icon="icon-file-text" link="/report/task" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Approved Task(s)" value={approvedTaskCount} color="green" icon="icon-file-text" link="/report/task" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Rejected Task(s)" value={rejectedTaskCount} color="red" icon="icon-file-text" link="/report/task" />
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
                                        <TaskDataTable data={activeTask} />
                                    </Tab>
                                    <Tab eventKey="2" title="Approved Task(s)">
                                        <TaskDataTable data={approvedTask} />
                                    </Tab>
                                    <Tab eventKey="3" title="Rejected Task(s)">
                                        <TaskDataTable data={rejectedTask} />
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
        activeTask: state.taskStore.activeTask,
        approvedTask: state.taskStore.approvedTask,
        rejectedTask: state.taskStore.rejectedTask,
        activeTaskCount: state.taskStore.activeTaskCount,
        approvedTaskCount: state.taskStore.approvedTaskCount,
        rejectedTaskCount: state.taskStore.rejectedTaskCount,
        taskProgress: state.taskStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchTask})(Task)