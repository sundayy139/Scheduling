import patientService from "../services/patientService";

let postBookAppoinment = async (req, res) => {
    try {
        let data = await patientService.postBookAppoinment(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


let postVerifyBookAppoinment = async (req, res) => {
    try {
        let data = await patientService.postVerifyBookAppoinment(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}



module.exports = {
    postBookAppoinment: postBookAppoinment,
    postVerifyBookAppoinment: postVerifyBookAppoinment
}