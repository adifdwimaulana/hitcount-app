import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Devices = React.lazy(() => import('./Demo/Devices/Devices'));
const Task = React.lazy(() => import('./Demo/Task/Task'));
const Team = React.lazy(() => import('./Demo/Team/Team'));
const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));

const routes = [
    { path: '/devices', exact: true, name: 'Devices Management', component: Devices },
    { path: '/devices/:id', name: 'Device Detail', component: Devices },
    { path: '/users', exact: true, name: 'Users Management', component: OtherSamplePage },
];

export default routes;