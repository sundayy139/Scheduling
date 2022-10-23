import db from "../models/index";

let checkSpecialty = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: { name: name }
            });

            if (specialty) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.name || !data.descMarkdown || !data.descMarkdown || !data.avatar) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let check = await checkSpecialty(data.name);
                if (check === true) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Specialty already exists'
                    })
                } else {
                    await db.Specialty.create({
                        name: data.name,
                        descMarkdown: data.descMarkdown,
                        descHTML: data.descHTML,
                        image: data.avatar
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Create specialty successfully !"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = '';
            if (id === "ALL") {
                specialties = await db.Specialty.findAll();
            }
            if (id && id !== "ALL") {
                specialties = await db.Specialty.findOne({
                    where: { id: id }
                })
            }

            resolve(specialties);
        } catch (e) {
            reject(e);
        }
    })
}

let editSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                });
            }

            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            });

            if (specialty) {
                specialty.name = data.name;
                specialty.descMarkdown = data.descMarkdown;
                specialty.descHTML = data.descHTML;
                if (data.avatar) {
                    specialty.image = data.avatar;
                }

                await specialty.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update specialty successfully"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Specialty not found"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: { id: id }
            })

            if (!specialty) {
                resolve({
                    errCode: 2,
                    errMessage: "Specialty not found"
                })
            } else {
                await db.Specialty.destroy({
                    where: { id: id }
                });
                resolve({
                    errCode: 0,
                    errMessage: "Specialty deleted successfully !"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailSpecialty = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: id },
                    // attributes: {
                    //     exclude: ['image']
                    // },
                })

                if (data) {
                    let doctorSpecialty = [];
                    if (location === "ALL") {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                specialtyId: id,
                            },
                            attributes: ['doctorId', 'provinceId']

                        })
                    } else {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                specialtyId: id,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty;
                } else data = {};

                resolve(data);
            }

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    deleteSpecialty: deleteSpecialty,
    editSpecialty: editSpecialty,
    getDetailSpecialty: getDetailSpecialty,
}