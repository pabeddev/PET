/**
 * @author Brandon Jared Molina Vazquez
 * @date 25/09/2023
 * @file In this module are the API endpoints.
 */

const { userRouter } = require("./routes/userRoutes");
const { authRouter } = require("./routes/authRoutes");
const { adminRouter } = require("./routes/adminRoutes");
const { rescuerRouter } = require("./routes/rescuerRoutes");
const { associationRouter } = require("./routes/associationRoutes");
const { HandlerHttpVerbs } = require("./errors/handlerHttpVerbs");
const path = require("path");
const mainDocs = require("./swagger/mainDocs");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const {
  postsRouter,
  bulletinsRouter,
  blogsRouter,
} = require("./routes/guestRoutes");
const { errorsCodes } = require("./utils/codes");
const e = require("express");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(morgan("dev"));

if (process.env.NODE_ENV === "development") {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(mainDocs, {
      customCssUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
      customCss:
        ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    })
  );

  app.get("/", (req, res) => {
    res.status(200).json(
      HandlerHttpVerbs.ok(
        "🦮🐩🐈🦜 Welcome to the Lost in Tapachula (PET) API v3.1 🦮🐩🐈🦜",
        undefined,
        {
          url: req.baseUrl,
          verb: req.method,
        }
      )
    );
  });
}

app.use("/api/v3/users", userRouter);
app.use("/api/v3/auth", authRouter);
app.use("/api/v3/admins", adminRouter);
app.use("/api/v3/rescuers", rescuerRouter);
app.use("/api/v3/posts", postsRouter);
app.use("/api/v3/blogs", blogsRouter);
app.use("/api/v3/bulletins", bulletinsRouter);
app.use("/api/v3/associations", associationRouter);

if (process.env.NODE_ENV === "production") {

  // public folder
  app.use(express.static(path.join(__dirname, "public/build")));

  // Handle SPA
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/build", "index.html"));
  });

}

app.use((req, res) => {
  res
    .status(404)
    .json(
      HandlerHttpVerbs.notFound(
        "This route not available 🚧",
        errorsCodes.ROUTE_NOT_FOUND,
        { url: req.baseUrl, verb: req.method }
      )
    );
});

app.listen(parseInt(process.env.PORT, 10), () => {
  console.log(`Server running on port http://localhost:${process.env.PORT} 🚀`);
});
