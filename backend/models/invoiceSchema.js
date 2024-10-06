const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    services:{type:[String],required:true},
    status: { type: String, enum: ['Paid', 'Pending', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
