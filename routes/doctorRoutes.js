const express = require("express");
const { getDoctorInfoController, 
    updateProfileController, 
    getDoctorByIdController,
    doctorAppointmentController,
    updateAppointmentStatusController,
    doctorDashboardController
 } = require("../controllers/doctorCtrl"); 
const authMiddleware = require("../middlewares/authMiddleware"); // Import auth middleware
// const doctorModel = require("../models/doctorModel");

const router = express.Router();

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);
router.post("/updateProfile", authMiddleware, updateProfileController);

router.post('/getDoctorById',authMiddleware,getDoctorByIdController);


router.get('/doctor-appointments',authMiddleware,doctorAppointmentController);

router.post("/update-appointment-status",authMiddleware ,updateAppointmentStatusController);
router.post('/getDoctorDashboard',authMiddleware,doctorDashboardController);
// routes/doctorRoutes.js

// // 👇 Insert this anywhere after you require express & doctorModel…
// router.post(
//     "/createDummyDoctor",
//     authMiddleware,
//     async (req, res) => {
//       try {
//         const { userId } = req.body;
//         const dummy = await doctorModel.create({
//           userId,
//           firstName: "Demo",
//           lastName:  "Doctor",
//           phone:     "1234567890",
//           email:     "demo@doctor.com",
//           address:   "123 Main St",
//           specialization:      "General Physician",
//           experience:          "5",
//           feesPerConsultation: "500",
//           timings:             ["09:00", "17:00"],
//         });
//         res.send({ success: true, data: dummy });
//       } catch (err) {
//         res.status(500).send({ success: false, message: err.message });
//       }
//     }
//   );
  
module.exports = router;
