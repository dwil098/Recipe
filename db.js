import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

export const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' }); 

import express from "express";
const app = express(); 



app.listen(3000, () => {
  console.log('App running at http://localhost:3000');
});

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});