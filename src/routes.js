import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const Approval = React.lazy(() => import('./Demo/Approval/Approval'));
const Task = React.lazy(() => import('./Demo/Task/Task'));
const Team = React.lazy(() => import('./Demo/Team/Team'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: DashboardDefault },
    { path: '/approval', exact: true, name: 'Approval', component: Approval },
    { path: '/management/team', exact: true, name: 'Management Team', component: Team },
    { path: '/management/task', exact: true, name: 'Management Task', component: Task },
    { path: '/management/customer', exact: true, name: 'Management Customer', component: FormsElements },
    { path: '/management/employee', exact: true, name: 'Management Employee', component: FormsElements },
    { path: '/report/transaction', exact: true, name: 'Report Transaction', component: FormsElements },
    { path: '/report/customer', exact: true, name: 'Report Customer', component: FormsElements },
    { path: '/report/employee', exact: true, name: 'Report Employee', component: FormsElements },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/profile', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;