import express from "express";
import { isAdmin, isAuth } from "../middleware/authMiddleware.js";
import {
  changeOrderStatus,
  createOrder,
  getAllOrders,
  getMyOrders,
  orderDetrails,
  paymets,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/create", isAuth, createOrder);
router.get("/get-my-orders", isAuth, getMyOrders);
router.get("/order-details/:id", isAuth, orderDetrails);
router.post("/payment", isAuth, paymets);

// for admin
router.get("/admin/get-all-orders", isAuth, isAdmin, getAllOrders);
router.put(
  "/admin/update-order-status/:id",
  isAuth,
  isAdmin,
  changeOrderStatus
);

export default router;
