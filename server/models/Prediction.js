const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  diseaseType: { type: String, enum: ['diabetes', 'heart'], required: true },
  inputValues: { type: Object, required: true },
  prediction: { type: String, required: true },
  confidence: { type: Number, required: true },
  recommendation: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prediction', predictionSchema);
