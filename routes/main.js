const express = require("express");
var app = express();
const router = express.Router();

router.get('/', function(req,res) {
    if(req.session.user){  //로그인 되어있는가?
        console.log("로그인 성공" );
        res.render("board",{user_id: req.session.user['userid']});
    } else{
        console.log("비회원상태");
        res.render("main",{user_id: "비회원"});
    }
})

module.exports=router;