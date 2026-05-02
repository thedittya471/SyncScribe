import { apiError } from "../utils/ApiError.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { File } from "../models/file.model.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const uploadFile = async (req, res) => {
  const localFilePath = req.file?.path;

  if (!localFilePath) {
    throw new apiError(400, "File is required");
  }

  const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

  if (!cloudinaryResponse) {
    throw new apiError(500, "Error while uploading file to cloudinary");
  }

  const mimetype = req.file.mimetype;
  let type = "other";

  if (mimetype.startsWith("image/")) type = "image";
  else if (mimetype.startsWith("video/")) type = "video";
  else if (mimetype.startsWith("audio/")) type = "audio";
  else if (mimetype === "application/pdf") type = "pdf";
  else if (
    mimetype.includes("spreadsheet") ||
    mimetype.includes("excel") ||
    mimetype.includes("csv")
  )
    type = "spreadsheet";
  else if (mimetype.includes("word") || mimetype.includes("document"))
    type = "document";
  else if (mimetype.includes("presentation") || mimetype.includes("powerpoint"))
    type = "presentation";
  else if (mimetype.includes("zip") || mimetype.includes("rar"))
    type = "archive";
  else if (mimetype.includes("javascript") || mimetype.includes("json") || mimetype.includes("code"))
    type = "code";

  const file = await File.create({
    name: req.file.originalname,
    type,
    size: req.file.size,
    url: cloudinaryResponse.secure_url,
    public_id: cloudinaryResponse.public_id,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new apiResponse(201, file, "File uploaded successfully"));
};

const getFilesByType = async (req, res) => {
  const { category } = req.query;
  const query = { owner: req.user._id, isTrashed: false };

  if (category === "Documents") {
    query.type = { $in: ["pdf", "document", "spreadsheet", "presentation"] };
  } else if (category === "Images") {
    query.type = "image";
  } else if (category === "Media") {
    query.type = { $in: ["video", "audio"] };
  } else if (category === "Others") {
    query.type = { $in: ["archive", "code", "other"] };
  }

  const files = await File.find(query).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, files, `${category || "All"} files fetched successfully`));
};

const getDashboardData = async (req, res) => {
  const userId = req.user._id;

  const stats = await File.aggregate([
    {
      $match: {
        owner: userId,
        isTrashed: false,
      },
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              {
                case: {
                  $in: ["$type", ["pdf", "document", "spreadsheet", "presentation"]],
                },
                then: "Documents",
              },
              { case: { $eq: ["$type", "image"] }, then: "Images" },
              { case: { $in: ["$type", ["video", "audio"]] }, then: "Media" },
            ],
            default: "Others",
          },
        },
        totalSize: { $sum: "$size" },
        fileCount: { $sum: 1 },
        lastUpdate: { $max: "$updatedAt" },
      },
    },
  ]);

  const totalStorage = stats.reduce((acc, curr) => acc + curr.totalSize, 0);

  return res.status(200).json(
    new apiResponse(
      200,
      {
        totalStorage,
        stats,
      },
      "Dashboard data fetched successfully",
    ),
  );
};

const getRecentFiles = async (req, res) => {
  const userId = req.user._id;
  const files = await File.find({ owner: userId, isTrashed: false })
    .sort({ createdAt: -1 })
    .limit(10);

  return res
    .status(200)
    .json(new apiResponse(200, files, "Recent files fetched successfully"));
};

const searchFiles = async (req, res) => {
  const { query } = req.query;
  const userId = req.user._id;

  if (!query) {
    return res
      .status(200)
      .json(new apiResponse(200, [], "Search query is empty"));
  }

  const files = await File.find({
    owner: userId,
    isTrashed: false,
    name: { $regex: query, $options: "i" },
  }).limit(20);

  return res
    .status(200)
    .json(new apiResponse(200, files, "Files fetched successfully"));
};

const renameFile = async (req, res) => {
  const { fileId } = req.params;
  const { newName } = req.body;

  if (!newName) {
    throw new apiError(400, "New name is required");
  }

  const file = await File.findOneAndUpdate(
    { _id: fileId, owner: req.user._id },
    { $set: { name: newName } },
    { new: true },
  );

  if (!file) {
    throw new apiError(404, "File not found or unauthorized");
  }

  return res
    .status(200)
    .json(new apiResponse(200, file, "File renamed successfully"));
};

const moveFileToTrash = async (req, res) => {
  const { fileId } = req.params;

  const file = await File.findOneAndUpdate(
    { _id: fileId, owner: req.user._id },
    {
      $set: {
        isTrashed: true,
        trashedAt: new Date(),
      },
    },
    { new: true },
  );

  if (!file) {
    throw new apiError(404, "File not found or unauthorized");
  }

  return res
    .status(200)
    .json(new apiResponse(200, file, "File moved to trash successfully"));
};

const getTrashedFiles = async (req, res) => {
  const userId = req.user._id;
  const files = await File.find({ owner: userId, isTrashed: true }).sort({
    trashedAt: -1,
  });

  return res
    .status(200)
    .json(new apiResponse(200, files, "Trashed files fetched successfully"));
};

const restoreFileFromTrash = async (req, res) => {
  const { fileId } = req.params;

  const file = await File.findOneAndUpdate(
    { _id: fileId, owner: req.user._id },
    {
      $set: {
        isTrashed: false,
      },
      $unset: {
        trashedAt: 1,
      },
    },
    { new: true },
  );

  if (!file) {
    throw new apiError(404, "File not found or unauthorized");
  }

  return res
    .status(200)
    .json(new apiResponse(200, file, "File restored successfully"));
};

const deleteFilePermanently = async (req, res) => {
  const { fileId } = req.params;

  const file = await File.findOne({ _id: fileId, owner: req.user._id });

  if (!file) {
    throw new apiError(404, "File not found or unauthorized");
  }

  let resourceType = "raw";
  if (file.type === "image") resourceType = "image";
  else if (file.type === "video" || file.type === "audio") resourceType = "video";

  await deleteFromCloudinary(file.public_id, resourceType);

  await File.findByIdAndDelete(fileId);

  return res
    .status(200)
    .json(new apiResponse(200, {}, "File deleted permanently"));
};

const emptyTrash = async (req, res) => {
  const userId = req.user._id;

  const files = await File.find({ owner: userId, isTrashed: true });

  if (files.length === 0) {
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Trash is already empty"));
  }

  const deletePromises = files.map((file) => {
    let resourceType = "raw";
    if (file.type === "image") resourceType = "image";
    else if (file.type === "video" || file.type === "audio")
      resourceType = "video";
    return deleteFromCloudinary(file.public_id, resourceType);
  });

  await Promise.all(deletePromises);

  await File.deleteMany({ owner: userId, isTrashed: true });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Trash emptied successfully"));
};

const downloadFile = async (req, res) => {
  const { fileId } = req.params;

  const file = await File.findOne({ _id: fileId, owner: req.user._id });

  if (!file) {
    throw new apiError(404, "File not found or unauthorized");
  }

  const downloadUrl = file.url.replace("/upload/", "/upload/fl_attachment/");

  return res.status(200).json(
    new apiResponse(
      200,
      {
        downloadUrl,
        name: file.name,
      },
      "Download URL generated successfully",
    ),
  );
};

const toggleFilePublicStatus = async (req, res) => {
  const { fileId } = req.params;
  const { isPublic } = req.body;

  if (typeof isPublic !== "boolean") {
    throw new apiError(400, "isPublic must be a boolean");
  }

  const file = await File.findOneAndUpdate(
    { _id: fileId, owner: req.user._id },
    { $set: { isPublic } },
    { new: true },
  );

  if (!file) {
    throw new apiError(404, "File not found or unauthorized");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        file,
        `File visibility set to ${isPublic ? "public" : "private"}`,
      ),
    );
};

const updateFilePermissions = async (req, res) => {
  const { fileId } = req.params;
  const { email, role } = req.body;

  if (!["viewer", "editor"].includes(role)) {
    throw new apiError(400, "Invalid role. Use 'viewer' or 'editor'");
  }

  const userToGrant = await User.findOne({ email });
  if (!userToGrant) {
    throw new apiError(404, "User not found");
  }

  const file = await File.findOne({ _id: fileId, owner: req.user._id });
  if (!file) {
    throw new apiError(404, "File not found or unauthorized");
  }

  if (file.owner.toString() === userToGrant._id.toString()) {
    throw new apiError(400, "Owner already has full access");
  }

  // Remove existing permission if any and add new one
  const updatedFile = await File.findByIdAndUpdate(
    fileId,
    {
      $pull: { permissions: { user: userToGrant._id } },
    },
    { new: true },
  );

  const finalFile = await File.findByIdAndUpdate(
    fileId,
    {
      $push: { permissions: { user: userToGrant._id, role } },
    },
    { new: true },
  ).populate("permissions.user", "username email");

  return res
    .status(200)
    .json(new apiResponse(200, finalFile, `Access granted to ${email} as ${role}`));
};

const removeFilePermission = async (req, res) => {
  const { fileId } = req.params;
  const { userId } = req.body;

  const file = await File.findOneAndUpdate(
    { _id: fileId, owner: req.user._id },
    {
      $pull: { permissions: { user: userId } },
    },
    { new: true },
  ).populate("permissions.user", "username email");

  if (!file) {
    throw new apiError(404, "File not found or unauthorized");
  }

  return res
    .status(200)
    .json(new apiResponse(200, file, "Access removed successfully"));
};

const getFilesSharedByMe = async (req, res) => {
  const userId = req.user._id;

  const files = await File.find({
    owner: userId,
    isTrashed: false,
    $or: [
      { permissions: { $exists: true, $not: { $size: 0 } } },
      { isPublic: true },
    ],
  }).populate("permissions.user", "username email");

  return res
    .status(200)
    .json(
      new apiResponse(200, files, "Files shared by you fetched successfully"),
    );
};

const getFilesSharedWithMe = async (req, res) => {
  const userId = req.user._id;

  const files = await File.find({
    owner: { $ne: userId },
    isTrashed: false,
    "permissions.user": userId,
  }).populate("owner", "username email");

  return res
    .status(200)
    .json(
      new apiResponse(200, files, "Files shared with you fetched successfully"),
    );
};

export {
  uploadFile,
  getFilesByType,
  getDashboardData,
  getRecentFiles,
  searchFiles,
  renameFile,
  moveFileToTrash,
  getTrashedFiles,
  restoreFileFromTrash,
  deleteFilePermanently,
  emptyTrash,
  downloadFile,
  toggleFilePublicStatus,
  updateFilePermissions,
  removeFilePermission,
  getFilesSharedByMe,
  getFilesSharedWithMe,
};
