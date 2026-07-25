import supabase from "../config/supabase";
import { randomUUID } from "crypto";


export async function uploadImage(file: Express.Multer.File) {

  const fileName = `${randomUUID()}-${file.originalname}`;


  const { error } = await supabase.storage
    .from("ads")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype
    });


  if (error) {
    throw error;
  }


  const { data } = supabase.storage
    .from("ads")
    .getPublicUrl(fileName);


  return data.publicUrl;
}

export async function deleteImage(imageUrl: string) {

  const fileName = imageUrl.split("/").pop();

  if (!fileName) {
    return;
  }

  const { error } = await supabase.storage
    .from("ads")
    .remove([fileName]);


  if (error) {
    throw error;
  }
}