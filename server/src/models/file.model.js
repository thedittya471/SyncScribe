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
        "document",   // doc, docx, txt
        "spreadsheet",// xls, xlsx, csv
        "presentation",// ppt, pptx
        "archive",    // zip, rar
        "code",       // js, cpp, py, etc.
        "other"
      ],
    },

    size: {
      type: Number, // in bytes
      required: true,
    },

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

    isPublic: {
      type: Boolean,
      default: false,
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

fileSchema.index({ owner: 1 });
fileSchema.index({ "permissions.user": 1 });
fileSchema.index({ owner: 1, createdAt: -1 });

export const File = mongoose.model("File", fileSchema);