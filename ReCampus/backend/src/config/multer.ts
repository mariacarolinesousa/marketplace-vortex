import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,

  fileFilter(req, file, cb) {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Formato de imagem inválido."));
    }

    cb(null, true);
  }
});