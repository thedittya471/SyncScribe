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
} from "../controllers/file.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

const router = Router();

router.use(jwtVerify);

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/").get(getFilesByType);
router.route("/dashboard").get(getDashboardData);
router.route("/recent").get(getRecentFiles);
router.route("/search").get(searchFiles);
router.route("/rename/:fileId").patch(renameFile);
router.route("/trash/:fileId").patch(moveFileToTrash);
router.route("/trashed").get(getTrashedFiles);
router.route("/restore/:fileId").patch(restoreFileFromTrash);
router.route("/delete/:fileId").delete(deleteFilePermanently);
router.route("/empty-trash").delete(emptyTrash);
router.route("/download/:fileId").get(downloadFile);

export default router;
