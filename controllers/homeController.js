exports.respondWithWeather = (req, res) => {
  res.render("weather");
};

exports.respondWithMyPage = (req, res) => {
  res.render("mypage");
};

exports.respondWithUpload = (req, res) => {
  res.render("upload");
};

exports.postedUploadForm = (req, res) => {
  console.log(req.file);
  res.send("Uploaded : " + req.file.filename);
};


exports.respondWithLogout = (req, res) => {
  res.render("logout");
};

exports.respondWithSearch = (req, res) => {
  res.render("search");
};


