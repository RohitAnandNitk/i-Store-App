import express from "express";
const router = express.Router();
import { testFun } from "../controllers/testController.js";

router.get("/test", testFun);

export default router;
