const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { finalDecision, deleteOwnHod, getAllApplications, getOverviewStats } = require("../controllers/hodController");

// GET overview stats for HOD
router.get("/overview-stats", protect, allowRoles("HOD"), getOverviewStats);

// GET all applications for HOD
router.get("/applications", protect, allowRoles("HOD"), getAllApplications);

router.put("/:id/decision", protect, allowRoles("HOD"), finalDecision);

// DELETE own HOD profile
router.delete("/me", protect, allowRoles("HOD"), deleteOwnHod);

module.exports = router;
