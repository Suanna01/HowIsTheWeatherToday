var express = require("express");
var router = express.Router();
var db = require("../db"); //디비 사용위해 필요
let bcrypt = require("bcrypt");

router.get('/', function(req,res){
    if (req.session.uid) {
    res.write(
      "<script type='text/javascript'>alert('You are already logged in.');</script>"
    );
    res.write("<script type='text/javascript'>location.href='/'</script>");
  } else {
    res.render("login");
  }

});

router.post("/", function (req, res) {
  var id = req.body.userid;
  var pw = req.body.password;

  console.log("post received: %s %s", id, pw);

  db.query(
      "select * from user where userid=?",
      [id],
      function (err, rows) {
        if (rows.length) {
          if (rows[0].userid === id) {
            bcrypt.compare(pw, rows[0].password, (err, tf) => {
              if (tf !== true) {
                console.log("로그인 실패");
                res.write("<script>alert('pwd : fail')</script>");
                res.write('<script>window.location="/"</script>');
              } else {
                req.session.uid = rows[0].userid;
                req.session.isLogined = true;
                req.session.isStudent = true;

                req.session.save(function (err1) {
                  if (err1) {
                    throw err;
                  }
                  console.log("학생 로그인");
                  console.log(req.session);
                  res.render("board");
                });
              }
            });
          }
        } else {
          console.log("로그인 실패");
          res.write("<script>alert('id : fail')</script>");
          res.write('<script>window.location="/"</script>');
        }
      }
    );
});

module.exports = router;