import _ from "lodash";
import db from "../models/index";


let getTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = await db.User.findAll({
                limit: limit,
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ['password']
                },
                where: { roleId: "R2" },
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Doctor_Info,
                        include: [
                            { model: db.Specialty }
                        ]
                    },
                    { model: db.AllCode, as: 'positionData', attributes: ['value_EN', 'value_VI'] },
                    { model: db.AllCode, as: 'genderData', attributes: ['value_EN', 'value_VI'] },
                ]
            })
            resolve({
                errCode: 0,
                data: users
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: {
                    exclude: ['password', 'image']
                }
            })

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e);
        }
    })
}

let checkValideInput = (inputData) => {
    let arrCheck = ['doctorId', 'contentMarkdown', 'contentHTML',
        'actions', 'selectedProvince', 'selectedPrice', 'selectedPayment',
        'selectedSpecialty', 'note']
    let isValid = true;
    let element = '';

    for (let i = 0; i < arrCheck.length; i++) {
        if (!inputData[arrCheck[i]]) {
            isValid = false;
            element = arrCheck[i];
            break;
        }
    }

    return {
        isValid: isValid,
        element: element
    }
}

let createDetailDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = checkValideInput(data);
            if (check.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter: ${check.element}`
                })
            } else {
                // upsert to markdown table
                if (data.actions === 'CREATE') {
                    let doctorInfo = await db.Doctor_Info.findOne({
                        where: {
                            doctorId: data.doctorId
                        },
                        raw: false
                    })
                    if (doctorInfo) {
                        doctorInfo.doctorId = data.doctorId;
                        doctorInfo.priceId = data.selectedPrice;
                        doctorInfo.provinceId = data.selectedProvince;
                        doctorInfo.paymentId = data.selectedPayment;
                        doctorInfo.specialtyId = data.selectedSpecialty;
                        doctorInfo.clinicId = data.selectedClinic;
                        doctorInfo.note = data.note;
                        doctorInfo.contentHTML = data.contentHTML;
                        doctorInfo.contentMarkdown = data.contentMarkdown;
                        doctorInfo.description = data.description;
                        await doctorInfo.save();
                    } else {
                        await db.Doctor_Info.create({
                            doctorId: data.doctorId,
                            priceId: data.selectedPrice,
                            provinceId: data.selectedProvince,
                            paymentId: data.selectedPayment,
                            specialtyId: data.selectedSpecialty,
                            clinicId: data.selectedClinic,
                            note: data.note,
                            contentHTML: data.contentHTML,
                            contentMarkdown: data.contentMarkdown,
                            description: data.description
                        })
                    }
                } else if (data.actions === 'EDIT') {
                    let doctorInfo = await db.Doctor_Info.findOne({
                        where: {
                            doctorId: data.doctorId
                        },
                        raw: false
                    })
                    if (doctorInfo) {
                        // update
                        doctorInfo.doctorId = data.doctorId;
                        doctorInfo.priceId = data.selectedPrice;
                        doctorInfo.provinceId = data.selectedProvince;
                        doctorInfo.paymentId = data.selectedPayment;
                        doctorInfo.specialtyId = data.selectedSpecialty;
                        doctorInfo.clinicId = data.selectedClinic;
                        doctorInfo.note = data.note;
                        doctorInfo.contentHTML = data.contentHTML;
                        doctorInfo.contentMarkdown = data.contentMarkdown;
                        doctorInfo.description = data.description;
                        await doctorInfo.save();
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save info doctor successfully !"
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailDoctor = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password', 'image']
                    },
                    include: [
                        { model: db.AllCode, as: 'positionData', attributes: ['value_EN', 'value_VI'] },
                        {
                            model: db.Doctor_Info,
                            include: [
                                { model: db.AllCode, as: 'priceData', attributes: ['value_EN', 'value_VI'] },
                                { model: db.AllCode, as: 'provinceData', attributes: ['value_EN', 'value_VI'] },
                                { model: db.AllCode, as: 'paymentData', attributes: ['value_EN', 'value_VI'] },
                            ]
                        },
                    ],
                    raw: true,
                    nest: true,
                })

                if (!data) return data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createScheduleDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.date) {

                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })

            } else {
                let schedule = data.arrSchedule;
                let existing = await db.Schedule.findAll({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date
                    },
                    attributes: ['timeType', 'maxNumber', 'date', 'doctorId'],
                    raw: true
                });

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }

                resolve({
                    errCode: 0,
                    errMessage: "Create sucessfully"
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getScheduleDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    nest: true,
                    raw: true,
                    include: [
                        { model: db.AllCode, as: 'timeTypeData', attributes: ['value_EN', 'value_VI'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
                    ]
                })

                if (!data) data = [];

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getExtraInfoDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let data = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: doctorId,
                    },
                    include: [
                        { model: db.AllCode, as: 'priceData', attributes: ['value_EN', 'value_VI'] },
                        { model: db.AllCode, as: 'provinceData', attributes: ['value_EN', 'value_VI'] },
                        { model: db.AllCode, as: 'paymentData', attributes: ['value_EN', 'value_VI'] },
                        { model: db.Clinic },
                    ],
                    raw: true,
                    nest: true,
                })

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getProfileDoctor = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: doctorId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Doctor_Info,
                            include: [
                                { model: db.AllCode, as: 'priceData', attributes: ['value_EN', 'value_VI'] },
                                { model: db.AllCode, as: 'provinceData', attributes: ['value_EN', 'value_VI'] },
                                { model: db.AllCode, as: 'paymentData', attributes: ['value_EN', 'value_VI'] },
                            ]
                        },
                        { model: db.AllCode, as: 'positionData', attributes: ['value_EN', 'value_VI'] },
                    ],
                    raw: true,
                    nest: true,
                })

                if (!data) return data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctors: getAllDoctors,
    createDetailDoctor: createDetailDoctor,
    getDetailDoctor: getDetailDoctor,
    createScheduleDoctor: createScheduleDoctor,
    getScheduleDoctor: getScheduleDoctor,
    getExtraInfoDoctor: getExtraInfoDoctor,
    getProfileDoctor: getProfileDoctor
}

