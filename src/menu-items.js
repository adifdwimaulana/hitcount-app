export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'approval',
                    title: 'Approval',
                    type: 'item',
                    url: '/approval',
                    icon: 'feather icon-activity',
                },
                {
                    id: 'management',
                    title: 'Management',
                    type: 'collapse',
                    icon: 'feather icon-file-text',
                    children: [
                        {
                            id: 'teamo',
                            title: 'Team',
                            type: 'item',
                            url: '/management/team'
                        },
                        {
                            id: 'employee',
                            title: 'Employee',
                            type: 'item',
                            url: '/management/employee'
                        },
                        {
                            id: 'tasktype',
                            title: 'Task Type',
                            type: 'item',
                            url: '/management/task-type'
                        },
                        {
                            id: 'task',
                            title: 'Task',
                            type: 'item',
                            url: '/management/task'
                        },
                        {
                            id: 'customer',
                            title: 'Customer',
                            type: 'item',
                            url: '/management/customer'
                        },
                    ]
                },
                {
                    id: 'report',
                    title: 'Report',
                    type: 'collapse',
                    icon: 'feather icon-file',
                    children: [
                        {
                            id: 'transaction',
                            title: 'Transaction',
                            type: 'item',
                            url: '/report/transaction'
                        },
                        {
                            id: 'customer',
                            title: 'Customer',
                            type: 'item',
                            url: '/report/customer'
                        },
                        {
                            id: 'employee',
                            title: 'Employee',
                            type: 'item',
                            url: '/report/employee'
                        },
                    ]
                },
                {
                    id: 'profile',
                    title: 'Profile',
                    type: 'item',
                    icon: 'feather icon-user',
                    url: '/profile'
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