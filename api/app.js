import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js"

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);

app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});