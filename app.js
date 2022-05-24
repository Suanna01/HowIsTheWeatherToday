const express = require("express"),
  app = express(),
  path = require('path'),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts"),
  multer = require('multer'),
  _storage = multer.diskStorage({
    destination: (req, file, cb) => { //path
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => { //파일명
      cb(null, file.originalname);
    }
  })
upload = multer({ storage: _storage });

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", homeController.respondWithWeather);
app.get("/mypage", homeController.respondWithMyPage);
app.get("/upload", homeController.respondWithUpload);
app.post("/upload", upload.single("userfile"), homeController.postedUploadForm);
app.get("/logout", homeController.respondWithLogout);
app.get("/search", homeController.respondWithSearch);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
