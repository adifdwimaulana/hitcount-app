import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';
import cookie from 'react-cookies';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import * as API_LINKS from '../../../config/link';

import { fetchLogin } from '../../../redux/actions/users/auth'
import { fetchTask, fetchTasks } from '../../../redux/actions/tasks/list'

import './app.scss';

class AdminLayout extends Component {

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentWillMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentWillMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }

    render() {
        const { authData, isAuthenticated, loginProgress } = this.props
        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        if(!cookie.load('isAuthenticated') && isAuthenticated == false){
            return(
                <Redirect from="/" to="/login" />
            )
        }

        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null)
        })

        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    <Navigation />
                    <NavBar />
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                    <ToastContainer autoClose={5000} position="bottom-right"/>
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader/>}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="/" to="/devices" />
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fullscreen>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.reducerStore.defaultPath,
        isFullScreen: state.reducerStore.isFullScreen,
        collapseMenu: state.reducerStore.collapseMenu,
        configBlock: state.reducerStore.configBlock,
        layout: state.reducerStore.layout,

        // Login state
        authData: state.loginStore.authData,
        isAuthenticated: state.loginStore.isAuthenticated,
        loginProgress: state.loginStore.inProgress,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        onComponentWillMount: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
    }
};

export default connect(mapStateToProps, {...mapDispatchToProps, fetchLogin})(windowSize(AdminLayout));