import { File } from "../models/file.model.js";
import { apiError } from "../utils/ApiError.js";

export const checkOwnership = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);

    if (!file) {
      throw new apiError(404, "File not found");
    }

    if (file.owner.toString() !== req.user._id.toString()) {
      throw new apiError(403, "Only the owner can perform this action");
    }

    req.file = file; // Attach file to request to avoid re-fetching in controller
    next();
  } catch (error) {
    next(error);
  }
};

export const checkEditAccess = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);

    if (!file) {
      throw new apiError(404, "File not found");
    }

    const isOwner = file.owner.toString() === req.user._id.toString();
    const isEditor = file.permissions.some(
      (p) => p.user.toString() === req.user._id.toString() && p.role === "editor",
    );

    if (!isOwner && !isEditor) {
      throw new apiError(403, "You do not have edit access to this file");
    }

    req.file = file;
    next();
  } catch (error) {
    next(error);
  }
};

export const checkViewAccess = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);

    if (!file) {
      throw new apiError(404, "File not found");
    }

    if (file.isPublic) {
      req.file = file;
      return next();
    }

    if (!req.user) {
      throw new apiError(401, "Authentication required to view this private file");
    }

    const isOwner = file.owner.toString() === req.user._id.toString();
    const hasPermission = file.permissions.some(
      (p) => p.user.toString() === req.user._id.toString(),
    );

    if (!isOwner && !hasPermission) {
      throw new apiError(403, "You do not have permission to view this file");
    }

    req.file = file;
    next();
  } catch (error) {
    next(error);
  }
};
