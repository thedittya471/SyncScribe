import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "File name is required"],
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "image",
        "video",
        "audio",
        "pdf",
        "document",
        "spreadsheet",
        "presentation",
        "archive",
        "code",
        "other"
      ],
      index: true
    },

    size: {
      type: Number,
      required: true,
    },

    // ☁️ Cloudinary
    url: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🔐 Permissions
    permissions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["viewer", "editor"],
          default: "viewer",
        },
      },
    ],

    // 🌍 Public
    isPublic: {
      type: Boolean,
      default: false,
    },

    // 🗑 Trash system
    isTrashed: {
      type: Boolean,
      default: false,
      index: true
    },

    trashedAt: {
      type: Date,
    },

    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);

// ⚡ Indexes
fileSchema.index({ owner: 1, createdAt: -1 });
fileSchema.index({ "permissions.user": 1 });
fileSchema.index({ type: 1 });

export const File = mongoose.model("File", fileSchema);