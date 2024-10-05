const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    dateIssued: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ['Paid', 'Pending', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
