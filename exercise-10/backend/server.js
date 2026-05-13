import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("api is running")
})

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

