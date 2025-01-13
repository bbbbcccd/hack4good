import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();
const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => console.log("listening on port:", PORT));
