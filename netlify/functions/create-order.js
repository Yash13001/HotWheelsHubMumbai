import 'dotenv/config';
import Razorpay from "razorpay";

export default async (req, context) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const body = await req.json();
    const amount = body.amount;
    
    console.log(`[create-order] Received request for amount: ${amount}`);

    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Razorpay API Error:", error.message || error);
    
    return new Response(JSON.stringify({ error: error.message || "Failed to initialize payment gateway" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
