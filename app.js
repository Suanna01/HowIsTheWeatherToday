const port = 3004;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const expressSession=require("express-session");

const mainRouter=require("./routes/main");
const joinRouter = require("./routes/join");
const loginRouter = require("./routes/login");
const boardRouter = require("./routes/board");

// ejs 설정
app.set('views', __dirname + '\\views');
app.set('view engine','ejs');
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("public"));

app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));

app.use("/",mainRouter);
app.use("/join",joinRouter);
app.use("/login",loginRouter);
app.use("/board",boardRouter);

//listen 함수로 3002 포트를 가진 서버를 실행한다. 
app.listen(port);
//서버가 실행된 것을 콘솔창에서 확인하기 위해 'Server is running...' 로그를 출력한다
console.log(` ${port} Server is running...`);