exports.respondWithWeather = (req, res) => {
  res.render("weather");
};

exports.respondWithMyPage = (req, res) => {
  res.render("mypage");
};

exports.respondWithLogout = (req, res) => {
  res.render("logout");
};

exports.respondWithSearch = (req, res) => {
  res.render("search");
};


