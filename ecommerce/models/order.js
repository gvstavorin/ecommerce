const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    producto: { type: ObjectId, ref: "Product" },
    nombre: String,
    precio: Number,
    count: Number
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    productos: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    direccion: String,
    status: {
      type: String,
      default: "No procesado",
      enum: ["No procesado", "En proceso", "Enviado", "Entregado", "Cancelado"] // 
    },
   
    updated: Date,
     usuario: { 
      type: ObjectId,
       ref: "User",
       default: null,

      },
  
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
