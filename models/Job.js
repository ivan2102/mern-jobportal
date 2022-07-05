import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({

   company: {type: String, required: true, maxlength: 70},
   position: {type: String, required: true, maxlength: 100},
   status: {type: String, enum:['interview', 'pending', 'declined'], default: 'pending'},
   jobType: {type: String, enum: ['part-time', 'full-time', 'internship', 'weekend'], default: 'full-time'},
   jobLocation: {type: String, default: 'my city', required: true},
   createdBy: {type: mongoose.Types.ObjectId, ref: 'User', required: true},

   
}, {

    timestamps: true
})

export default mongoose.model('Job', JobSchema)