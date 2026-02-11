const Leave = require("../models/LeaveApplication");
const Message = require("../models/ApplicationMessage");
const Hod = require("../models/Hod");
const User = require("../models/User");

exports.getOverviewStats = async (req, res) => {
  try {
    const hod = await require('../models/Hod').findOne({ user_id: req.user._id });
    if (!hod) return res.status(404).json({ message: "HOD profile not found" });

    // Get all applications for the department
    const applications = await Leave.find({
      "student_snapshot.department": hod.department
    });

    // Get faculty count for the department
    const facultyCount = await Faculty.countDocuments({
      department: hod.department
    });

    const stats = {
      pendingHod: applications.filter(app => app.status === 'PENDING_HOD').length,
      approved: applications.filter(app => app.status === 'APPROVED').length,
      rejected: applications.filter(app => app.status === 'REJECTED').length,
      total: applications.length,
      facultyMembers: facultyCount
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const hod = await Hod.findOne({ user_id: req.user._id });
    if (!hod) return res.status(404).json({ message: "HOD profile not found" });

    const applications = await Leave.find({
      "student_snapshot.department": hod.department
    }).sort({ submitted_at: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.finalDecision = async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  leave.status = req.body.status;
  leave.hod_action_at = new Date();
  await leave.save();

  if (req.body.message) {
    await Message.create({
      application_id: leave._id,
      sender_role: "HOD",
      sender_id: req.user._id,
      message: req.body.message
    });
  }

  res.json(leave);
};

exports.deleteOwnHod = async (req, res) => {
  const hod = await Hod.findOne({ user_id: req.user._id });
  if (!hod) return res.status(404).json({ message: "HOD not found" });

  // clear hod references from leave applications
  await Leave.updateMany({ hod_id: hod._id }, { $unset: { hod_id: "" } });

  // delete user
  if (hod.user_id) {
    await User.findByIdAndDelete(hod.user_id);
  }

  // delete hod document
  await Hod.findByIdAndDelete(hod._id);

  res.json({ message: "HOD and related references deleted" });
};
