"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const supabase_1 = require("./config/supabase");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("Cliente Supabase carregado");
async function test() {
    const { data, error } = await supabase_1.supabase.storage
        .from("ads")
        .list();
    if (error) {
        console.log(error);
        return;
    }
    console.log(data);
}
test();
