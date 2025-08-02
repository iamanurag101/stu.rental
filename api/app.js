import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js"

const app = express();

const allowedOrigins = process.env.CLIENT_URLS?.split(',') || [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS")); // Block request
    }
  },
  credentials: true
}));
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