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

module.exports = {
    getTopDoctor: getTopDoctor,
}

