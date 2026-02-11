const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { reviewLeave, deleteOwnFaculty, getPendingApplications, getAllApplications, getOverviewStats } = require("../controllers/facultyController");

// GET overview stats for faculty
router.get("/overview-stats", protect, allowRoles("FACULTY"), getOverviewStats);

// GET pending applications for faculty
router.get("/applications", protect, allowRoles("FACULTY"), getPendingApplications);

// GET all applications for faculty
router.get("/all-applications", protect, allowRoles("FACULTY"), getAllApplications);

router.put("/:id/review", protect, allowRoles("FACULTY"), reviewLeave);

// DELETE own faculty profile
router.delete("/me", protect, allowRoles("FACULTY"), deleteOwnFaculty);

module.exports = router;
