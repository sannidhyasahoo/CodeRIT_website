import mongoose from 'mongoose';

const PlacementTalkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    usn: {
      type: String,
      required: [true, 'USN is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [
        /^1MS\d{2}[A-Z]{2}\d{3}$/i,
        'Invalid USN format. Expected format: 1MS24CS067'
      ]
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address'
      ]
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
      trim: true
    },
    question: {
      type: String,
      trim: true,
      maxlength: [500, 'Question cannot exceed 500 characters'],
      default: ''
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'placementtalk26'
  }
);

PlacementTalkSchema.index({ email: 1 });
PlacementTalkSchema.index({ usn: 1 });

const PlacementTalk = mongoose.models.PlacementTalk || mongoose.model('PlacementTalk', PlacementTalkSchema);

export default PlacementTalk;
