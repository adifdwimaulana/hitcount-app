export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'devices',
                    title: 'Devices',
                    type: 'item',
                    url: '/devices',
                    icon: 'feather icon-home',
                },
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    icon: 'feather icon-user',
                    url: '/users'
                },
                {
                    id: 'logout',
                    title: 'Logout',
                    type: 'item',
                    icon: 'feather icon-log-out',
                    url: '/logout'
                }
            ]
        },
    ]
}