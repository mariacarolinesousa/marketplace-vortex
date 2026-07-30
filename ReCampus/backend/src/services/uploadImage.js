"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = uploadImage;
exports.deleteImage = deleteImage;
const supabase_1 = __importDefault(require("../config/supabase"));
const crypto_1 = require("crypto");
async function uploadImage(file) {
    const fileName = `${(0, crypto_1.randomUUID)()}-${file.originalname}`;
    const { error } = await supabase_1.default.storage
        .from("ads")
        .upload(fileName, file.buffer, {
        contentType: file.mimetype
    });
    if (error) {
        throw error;
    }
    const { data } = supabase_1.default.storage
        .from("ads")
        .getPublicUrl(fileName);
    return data.publicUrl;
}
async function deleteImage(imageUrl) {
    const fileName = imageUrl.split("/").pop();
    if (!fileName) {
        return;
    }
    const { error } = await supabase_1.default.storage
        .from("ads")
        .remove([fileName]);
    if (error) {
        throw error;
    }
}
