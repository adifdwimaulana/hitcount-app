import React from 'react';
import { Row, Col, Card, Nav, Tab, Tabs } from 'react-bootstrap';
import { BarLoader } from 'react-spinners'
import { connect } from 'react-redux';
import Aux from "../../hoc/_Aux";
import SummaryWidget from '../Widgets/SummaryWidget'
import UsersDataTable from './UsersDataTable'

import { fetchUsers } from '../../redux/actions/users/list'

class Users extends React.Component {
    constructor(props){
        super(props)

        this.state = {  }
    }

    componentWillMount = () => {
        this.props.fetchUsers()
    }

    render(){
        const { users, adminCount, userCount, userProgress } = this.props
        return(
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Total User(s)" value={adminCount + userCount} color="blue" icon="icon-cast" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Admin(s)" value={adminCount} color="green" icon="icon-cast" />
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="User(s)" value={userCount} color="red" icon="icon-cast" />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Users Management</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                {
                                    !userProgress ? <UsersDataTable data={users} /> : <center><BarLoader color={'#123abc'} loading={userProgress} /></center>
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
        users: state.userStore.users,
        userOptions: state.userStore.userOptions,
        adminCount: state.userStore.adminCount,
        userCount: state.userStore.userCount,
        userProgress: state.userStore.inProgress
    }
}

export default connect(mapStateToProps, {fetchUsers})(Users)