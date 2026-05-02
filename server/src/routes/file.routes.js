import {
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
} from "../controllers/file.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import {
  checkOwnership,
  checkViewAccess,
} from "../middlewares/fileAccess.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

router.use(jwtVerify);

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/").get(getFilesByType);
router.route("/dashboard").get(getDashboardData);
router.route("/recent").get(getRecentFiles);
router.route("/search").get(searchFiles);

// Protected by access control
router.route("/rename/:fileId").patch(checkOwnership, renameFile);
router.route("/trash/:fileId").patch(checkOwnership, moveFileToTrash);
router.route("/trashed").get(getTrashedFiles);
router.route("/restore/:fileId").patch(checkOwnership, restoreFileFromTrash);
router.route("/delete/:fileId").delete(checkOwnership, deleteFilePermanently);
router.route("/empty-trash").delete(emptyTrash);
router.route("/download/:fileId").get(checkViewAccess, downloadFile);
router.route("/toggle-public/:fileId").patch(checkOwnership, toggleFilePublicStatus);
router.route("/share/:fileId").patch(checkOwnership, updateFilePermissions);
router.route("/revoke/:fileId").patch(checkOwnership, removeFilePermission);
router.route("/shared-by-me").get(getFilesSharedByMe);
router.route("/shared-with-me").get(getFilesSharedWithMe);

export default router;
