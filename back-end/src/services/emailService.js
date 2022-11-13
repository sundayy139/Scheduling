require('dotenv').config();
import nodemailer from 'nodemailer';

let sendEmail = async (dataSend) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.PASSWORD_APP, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Support" <foo@example.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: subject(dataSend), // Subject line
        text: "Hello world?", // plain text body
        html: bodyHTMEmail(dataSend)
    });

}

let bodyHTMEmail = (dataSend) => {
    let result = [];
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh trên BookingCare</p>
        <p>Thông tin đặt lịch:</p>
        <div>
            Thời gian:<strong> ${dataSend.time}</strong>
        </div>
        <div>
            Tên bác sĩ:<strong> ${dataSend.doctorName}</strong>
        </div>
        <p>Nếu thông tin trên là đúng, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
            <a href=${dataSend.redirectLink} target = "_blank" >Click here</a>
        </div>
        <p>Xin chân thành cảm ơn !</p>
        `
    }

    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>You received this Email for booking a medical appointment on BookingCare</p>
        <p>Booking information:</p>
        <div>
            Time:<strong> ${dataSend.time}</strong>
        </div>
        <div>
            Doctor's Name:<strong> ${dataSend.doctorName}</strong>
        </div>
        <p>If the above information is correct, please click on the link below to confirm and complete the medical appointment procedure</p>
        <div>
            <a href=${dataSend.redirectLink} target = "_blank" >Click here</a>
        </div>
        <p>Thank you very much !</p>
        `
    }
    return result;
}

let subject = (dataSend) => {
    let result = [];
    if (dataSend.language === 'vi') {
        result = "Xác nhận lịch hẹn khám bệnh";
    }

    if (dataSend.language === 'en') {
        result = "Confirm your medical appointment";
    }

    return result;
}


let sendRemedy = async (dataSend) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.PASSWORD_APP, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Support" <foo@example.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: subjectRemedy(dataSend), // Subject line
        text: "Hello world?", // plain text body
        html: bodyHTMEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.image.split("base64,")[1],
                encoding: 'base64',
            }
        ]
    });
}


let bodyHTMEmailRemedy = (dataSend) => {
    let result = [];
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được Email này vì đã đặt hoàn thành khám bệnh trên BookingCare</p>
        <p>Thông tin đơn thuốc / hóa đơn được gửi trong file đính kèm</p>
        <p>Xin chân thành cảm ơn !</p>
        `
    }

    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>You received tYou received this Email because you completed your booking on BookingCare</p>
        <p>Prescription/ Bill information sent in attachment</p>
        <p>Thank you very much !</p>
        `
    }
    return result;
}

let subjectRemedy = (dataSend) => {
    let result = [];
    if (dataSend.language === 'vi') {
        result = "Hóa đơn/ Đơn thuốc";
    }

    if (dataSend.language === 'en') {
        result = "Bill/ Prescription";
    }

    return result;
}


module.exports = {
    sendEmail: sendEmail,
    sendRemedy: sendRemedy
}