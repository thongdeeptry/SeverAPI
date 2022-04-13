const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cardSchema = new Schema({
    id_product:{ type: String },
    user_id:{ type: String },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    image: { type: String },
    description: { type: String },
    released: { type: Date }
});

module.exports = mongoose.model('card', cardSchema);