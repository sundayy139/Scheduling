import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import handbookController from "../controllers/handbookController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.post("/api/change-password", userController.changePassword);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);


    router.get('/api/top-doctor', doctorController.getTopDoctor);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-info-doctor', doctorController.createDetailDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctor);
    router.post('/api/create-schedule-doctor', doctorController.createScheduleDoctor);
    router.delete('/api/delete-schedule-doctor', doctorController.deleteScheduleDoctor);
    router.put('/api/edit-schedule-doctor', doctorController.editScheduleDoctor);
    router.get('/api/get-schedule-doctor', doctorController.getScheduleDoctor);
    router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraInfoDoctor);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctor);
    router.get('/api/get-list-patient', doctorController.getListPatient);
    router.post('/api/send-remedy', doctorController.sendRemedy);

    router.post('/api/patient-book-appoinment', patientController.postBookAppoinment);
    router.post('/api/verify-booking-appoinment', patientController.postVerifyBookAppoinment);

    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.delete('/api/delete-specialty', specialtyController.deleteSpecialty);
    router.put("/api/edit-specialty", specialtyController.editSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialty);

    router.post('/api/create-new-clinic', clinicController.createClinic);
    router.get('/api/get-all-clinic', clinicController.getAllClinic);
    router.delete('/api/delete-clinic', clinicController.deleteClinic);
    router.put('/api/edit-clinic', clinicController.editClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinic);

    router.post('/api/create-new-handbook', handbookController.createHandbook);
    router.get('/api/get-all-handbook', handbookController.getAllHandbook);
    router.get('/api/get-limit-handbook', handbookController.getLimitHandbook);
    router.delete('/api/delete-handbook', handbookController.deleteHandbook);
    router.put('/api/edit-handbook', handbookController.editHandbook);
    router.get('/api/get-detail-handbook-by-id', handbookController.getDetailHandbook);



    return app.use("/", router);
}

module.exports = initWebRoutes;


