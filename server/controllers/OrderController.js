import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import { stripe } from "../server.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    } = req.body;

    // Fetch all products in a single query to avoid multiple DB calls
    const productIds = orderItems.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    // Create a map for quick lookup
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    // Validate stock before processing
    for (let item of orderItems) {
      const product = productMap.get(item.product.toString());
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} not found`,
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        });
      }
    }

    // Reduce stock after validation
    for (let item of orderItems) {
      const product = productMap.get(item.product.toString());
      product.stock -= item.quantity;
    }

    // Save updated product stock in a single operation
    await Promise.all(products.map((product) => product.save()));

    // Create order
    await Order.create({
      user: req.user._id,
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Create Order API",
      error,
    });
  }
};

// GET ALL ORDERS - MY ORDERS
export const getMyOrders = async (req, res) => {
  try {
    // find orders
    const orders = await Order.find({ user: req.user._id });
    //valdiation
    if (!orders) {
      return res.status(404).send({
        success: false,
        message: "no orders found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your orders data",
      totalOrder: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In My orders Order API",
      error,
    });
  }
};

// GET SINGLE ORDER INFO
export const orderDetrails = async (req, res) => {
  try {
    // find orders
    const order = await Order.findById(req.params.id);
    //valdiation
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "no order found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your order fetched",
      order,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};

// ACCEPT PAYMENTS
export const paymets = async (req, res) => {
  try {
    // get ampunt
    const { totalAmount } = req.body;
    // validation
    if (!totalAmount) {
      return res.status(404).send({
        success: false,
        message: "Total Amount is require",
      });
    }
    const { client_secret } = await stripe.paymentIntents.create({
      amount: Number(totalAmount * 100),
      currency: "usd",
    });
    res.status(200).send({
      success: true,
      client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};

// ========== ADMIN SECTION =============

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send({
      success: true,
      message: "All Orders Data",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
export const changeOrderStatus = async (req, res) => {
  try {
    // find order
    const order = await Order.findById(req.params.id);
    // validatiom
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "order not found",
      });
    }
    if (order.orderStatus === "processing") order.orderStatus = "shipped";
    else if (order.orderStatus === "shipped") {
      order.orderStatus = "deliverd";
      order.deliverdAt = Date.now();
    } else {
      return res.status(500).send({
        success: false,
        message: "order already deliverd",
      });
    }
    await order.save();
    res.status(200).send({
      success: true,
      message: "order status updated",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};
