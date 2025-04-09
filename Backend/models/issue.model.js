import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Violent Crimes",
        "Property Crimes",
        "White-Collar Crimes",
        "Organized Crimes",
        "Victimless or Consensual Crimes",
      ],
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: "Pending", 
        required: true,
    },

    location: {
        lat: {
          type: Number,
          required: true
        },
        lng: {
          type: Number,
          required: true
        }
      },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
