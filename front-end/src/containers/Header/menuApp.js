export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.doctor',
        menus: [
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            { name: 'menu.admin.manage-info-doctor', link: '/system/manage-info-doctor' },
        ]
    },

    { //phòng khám
        name: 'menu.admin.clinics',
        menus: [
            { name: 'menu.admin.manage-clinics', link: '/system/manage-clinic' },
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

export const doctorMenu = [
    { //quản lý kế hoạch khám bệnh
        name: 'menu.doctor.user',
        menus: [
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' },
            { name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient' },
        ]
    },
];