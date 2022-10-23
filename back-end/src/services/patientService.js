import _ from "lodash";
import db from "../models/index";
import emailService from "../services/emailService";
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`

    return result;
}

let postBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date ||
                !data.timeType || !data.firstName || !data.lastName ||
                !data.phoneNumber || !data.address || !data.reason) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                });
            } else {

                //upsert patient user
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phoneNumber: data.phoneNumber,
                        password: '123456789',
                        gender: data.gender,
                        positionId: 'P0',
                        address: data.address,
                        dateOfBirth: data.dateOfBirth,
                        roleId: "R3"
                    }
                });

                let token = uuidv4();

                await emailService.sendEmail({
                    receiverEmail: data.email,
                    patientName: `${data.lastName} ${data.firstName}`,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                // create a booking table
                if (user && user[0]) {
                    let booking = [{
                        doctorId: data.doctorId,
                        patientId: user[0].id,
                        statusId: "S1",
                        date: data.date,
                        timeType: data.timeType,
                        reason: data.reason,
                        token: token
                    }]

                    let existing = await db.Booking.findAll({
                        where: {
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                        },
                        attributes: ['timeType', 'patientId', 'date', 'doctorId'],
                        raw: true
                    });

                    let toCreate = _.differenceWith(booking, existing, (a, b) => {
                        return a.timeType === b.timeType && a.date === b.date
                            && a.patientId === b.patientId && a.doctorId === b.doctorId;
                    });

                    if (toCreate && toCreate.length > 0) {
                        await db.Booking.bulkCreate(toCreate);
                    }

                }

                resolve({
                    errCode: 0,
                    errMessage: "Booking appointment successfully, please check your email and confirm booking",
                });
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let postVerifyBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: "S1"
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save();

                    resolve({
                        errCode: "0",
                        errMessage: "Update appointment  successfully"
                    })
                } else {
                    resolve({
                        errCode: "2",
                        errMessage: "Appointment has been active or does not exist"
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppoinment: postBookAppoinment,
    postVerifyBookAppoinment: postVerifyBookAppoinment
}