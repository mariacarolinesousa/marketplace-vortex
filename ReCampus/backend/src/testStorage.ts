import "dotenv/config"
import { supabase } from "./config/supabase";

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("Cliente Supabase carregado");

async function test(){

 const { data, error } =
 await supabase.storage
 .from("ads")
 .list();


 if(error){
   console.log(error);
   return;
 }


 console.log(data);
}


test();