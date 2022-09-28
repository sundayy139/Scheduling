export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.user',
        menus: [
            { name: 'menu.admin.crud-user', link: '/system/crud-user' },
            { name: 'menu.admin.crud-redux', link: '/system/crud-user-redux' },
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            { name: 'menu.admin.manage-admin', link: '/system/manage-admin' },
        ]
    },
    { //phòng khám
        name: 'menu.admin.clinics',
        menus: [
            { name: 'menu.admin.manage-clinics', link: '/system/manage-clinics' },
        ]
    },
    { //chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' },
        ]
    },
    { //cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' },
        ]
    },
];