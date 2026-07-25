import { supabase } from "../config/supabase";
import crypto from "crypto";

export async function uploadImage(file: Express.Multer.File) {
  const extension = file.originalname.split(".").pop();

  const fileName =
    crypto.randomUUID() + "." + extension;

  const { error } = await supabase.storage
    .from("ads-images")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from("ads-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}