import db from "../models/index";

let checkHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let handbook = await db.Handbook.findOne({
                where: {
                    title: data.title,
                }
            });

            if (handbook) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || !data.title || !data.descMarkdown
                || !data.descMarkdown || !data.avatar) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let check = await checkHandbook(data);
                if (check === true) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Handbook already exists'
                    })
                } else {
                    await db.Handbook.create({
                        title: data.title,
                        descMarkdown: data.descMarkdown,
                        descHTML: data.descHTML,
                        image: data.avatar,
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Create handboolk successfully !"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllHandbook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let handbooks = '';
            if (id === "ALL") {
                handbooks = await db.Handbook.findAll({
                    order: [["createdAt", "DESC"]],
                });
            }
            if (id && id !== "ALL") {
                handbooks = await db.Handbook.findOne({
                    where: { id: id },
                })
            }

            resolve(handbooks);
        } catch (e) {
            reject(e);
        }
    })
}

let getLimitHandbook = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let handbooks = await db.Handbook.findAll({
                limit: limit,
                order: [["createdAt", "DESC"]],
                raw: true,
                nest: true,
            })
            resolve(handbooks);
        } catch (e) {
            reject(e);
        }
    })
}

let editHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                });
            }

            let handbook = await db.Handbook.findOne({
                where: { id: data.id },
                raw: false
            });

            if (handbook) {
                handbook.title = data.title;
                handbook.descMarkdown = data.descMarkdown;
                handbook.descHTML = data.descHTML;
                if (data.avatar) {
                    handbook.image = data.avatar;
                }

                await handbook.save();

                resolve({
                    errCode: 0,
                    errMessage: "Update handbook successfully"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Handbook not found"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteHandbook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let handbook = await db.Handbook.findOne({
                where: { id: id }
            })

            if (!handbook) {
                resolve({
                    errCode: 2,
                    errMessage: "Handbook not found"
                })
            } else {
                await db.Handbook.destroy({
                    where: { id: id }
                });
                resolve({
                    errCode: 0,
                    errMessage: "Handbook deleted successfully !"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailHandbook = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                });
            } else {
                let data = await db.Handbook.findOne({
                    where: { id: id },
                })
                resolve(data);
            }

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createHandbook,
    getAllHandbook,
    deleteHandbook,
    editHandbook,
    getDetailHandbook,
    getLimitHandbook
}