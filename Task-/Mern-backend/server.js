const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");

dotenv.config();
const app = express();

// ✅ Always enable CORS BEFORE routes
app.use(
  cors({
    origin: ["http://localhost:5173","http://65.0.170.2:30080","http://gaurav.club"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// ✅ Enable JSON parsing
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/workgroups", require("./routes/workgroupRoutes"));
app.use("/api/project-tasks", require("./routes/ProjecttaskRoutes")); // only once!
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/dashboard", dashboardRoutes);


// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "ProjectManagement" })
  .then(async () => {
    console.log("MongoDB connected");

    const User = require("./models/User");

    // -------- SEED ADMIN 1 --------
    const adminEmail1 = "jitendrabuddha@gmail.com";
    const admin1Exists = await User.findOne({ email: adminEmail1 });

    if (!admin1Exists) {
      const hashedPassword = await bcrypt.hash("987654321_j", 10);
      await new User({
        username: "jitendrabuddha",
        email: adminEmail1,
        password: hashedPassword,
        role: "admin",
      }).save();
      console.log("⚡ Admin (jitendrabuddha) created");
    }

    // -------- SEED ADMIN 2 --------
    const adminEmail2 = "admin21@gmail.com";
    const admin2Exists = await User.findOne({ email: adminEmail2 });

    if (!admin2Exists) {
      const hashedPassword2 = await bcrypt.hash("admin12345678_a", 10);
      await new User({
        username: "admin2",
        email: adminEmail2,
        password: hashedPassword2,
        role: "admin",
      }).save();
      console.log("⚡ Admin (admin2) created");
    }
  })
  .catch((err) => console.log("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
