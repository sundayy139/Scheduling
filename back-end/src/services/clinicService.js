import db from "../models/index";

let checkSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: {
                    name: data.name,
                    provinceId: data.provinceId,
                }
            });

            if (clinic) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.name || !data.descMarkdown
                || !data.descMarkdown || !data.avatar || !data.provinceId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let check = await checkSpecialty(data);
                if (check === true) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Clinic already exists'
                    })
                } else {
                    await db.Clinic.create({
                        name: data.name,
                        address: data.address,
                        descMarkdown: data.descMarkdown,
                        descHTML: data.descHTML,
                        image: data.avatar,
                        logo: data.lg,
                        provinceId: data.provinceId
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Create clinic successfully !"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinics = '';
            if (id === "ALL") {
                clinics = await db.Clinic.findAll();
            }
            if (id && id !== "ALL") {
                clinics = await db.Clinic.findOne({
                    where: { id: id }
                })
            }

            resolve(clinics);
        } catch (e) {
            reject(e);
        }
    })
}

let editClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                });
            }

            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            });

            if (clinic) {
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.provinceId = data.provinceId;
                clinic.descMarkdown = data.descMarkdown;
                clinic.descHTML = data.descHTML;
                if (data.avatar) {
                    clinic.image = data.avatar;
                }

                if (data.lg) {
                    clinic.logo = data.lg;
                }

                await clinic.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update clinic successfully"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Clinic not found"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: id }
            })

            if (!clinic) {
                resolve({
                    errCode: 2,
                    errMessage: "Clinic not found"
                })
            } else {
                await db.Clinic.destroy({
                    where: { id: id }
                });
                resolve({
                    errCode: 0,
                    errMessage: "Clinic deleted successfully !"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: id },
                })

                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: {
                            clinicId: id,
                        },
                        attributes: ['doctorId']

                    })
                    data.doctorClinic = doctorClinic;
                } else data = {};

                resolve(data);
            }

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    deleteClinic: deleteClinic,
    editClinic: editClinic,
    getDetailClinic: getDetailClinic
}