import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import {Line} from 'react-chartjs-2'
import Aux from "../../hoc/_Aux";
import SummaryWidget from '../Widgets/SummaryWidget'

class Dashboard extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            types: ['daily', 'monthly', 'yearly'],
            selectedType: 'daily'
        }
    }

    componentWillMount = () => {

    }

    chips = (item) => {
        const { selectedType } = this.state
        const color = '#007bff'
        return(
            <h6 style={{ border: `1px solid ${color}`, color: `${selectedType == item ? '#fff' : color}`, background: `${selectedType == item ? color : '#fff'}` }}
                className="chip" onClick={() => this.setState({selectedType: item})}>{item}</h6>
        )
    }

    render() {
        const { types, selectedType } = this.state
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Daily Transaction" value="Rp. 249.952" percentage={50} color="green" icon="icon-arrow-up" link="/report/transaction">
                            <div className="progress m-t-30" style={{height: '7px'}}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                            </div>
                        </SummaryWidget>
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Weekly Transaction" value="Rp. 2.942.132" percentage={35} color="red" icon="icon-arrow-down">
                            <div className="progress m-t-30" style={{height: '7px'}}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                            </div>
                        </SummaryWidget>
                    </Col>
                    <Col md={6} xl={4}>
                        <SummaryWidget title="Monthly Transaction" value="Rp. 3.942.132" percentage={75} color="green" icon="icon-arrow-up">
                            <div className="progress m-t-30" style={{height: '7px'}}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                            </div>
                        </SummaryWidget>
                    </Col>

                    <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header className="vertical-center" style={{ justifyContent: 'space-between'}}>
                                <Card.Title as='h5'>Total Transactions</Card.Title>
                                <div className="vertical-center">
                                    {
                                        types.map((item, index) =>
                                            this.chips(item)
                                        )
                                    }

                                </div>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Line height={120} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Unapproved Tasks</h5>
                                    </div>
                                    <div className="col-auto">
                                        <label className="label text-white f-14 f-w-400 float-right" style={{ background: '#f44236' }}>34 Tasks</label>
                                    </div>
                                </div>
                                <h2 className="mt-2 f-w-300">34<sub className="text-muted f-14">Tasks</sub></h2>
                                <h6 className="text-muted mt-3 mb-0">Please check and approve immmediately!</h6>
                                <i className="feather icon-alert-circle text-c-red f-30"/>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-user f-30 text-c-green"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">12</h3>
                                        <span className="d-block text-uppercase">total employees</span>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-users f-30 text-c-blue"/>
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">4</h3>
                                        <span className="d-block text-uppercase">total teams</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Dashboard;