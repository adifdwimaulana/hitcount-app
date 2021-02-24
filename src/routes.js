import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Devices = React.lazy(() => import('./Demo/Devices/Devices'));
const DeviceDetail = React.lazy(() => import('./Demo/Devices/DevicesDetail'));
const Users = React.lazy(() => import('./Demo/Users/Users'));

const routes = [
    { path: '/devices', exact: true, name: 'Devices Management', component: Devices },
    { path: '/devices/:id', name: 'Device Detail', component: DeviceDetail },
    { path: '/users', exact: true, name: 'Users Management', component: Users },
];

export default routes;