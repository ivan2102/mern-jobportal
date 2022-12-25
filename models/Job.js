import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({

company: {type: String, required: true, maxlength: 50}, 
position: {type: String, required: true, maxlength: 100},
status: {type: String, enum: ['interview', 'searching', 'pending'], default: 'searching'},
jobType: {type: String, enum: ['internship', 'weekend', 'part-time', 'full-time', 'freelance'], default: 'freelance'},
jobLocation: {type: String, default: 'my city', required: true},
createdBy: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},


}, {

    timestamps: true
})

export default mongoose.model('Job', JobSchema);