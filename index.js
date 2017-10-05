var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var date = new Date("10/4/2017 20:45");

console.log(date);
console.log(new Date());

var server = require("http").Server(app).listen(process.env.OPENSHIFT_NODEJS_PORT || 1234, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

app.get("/", function (req, res) {

    if (date-new Date()>0)
        res.end("Event start in "+(Math.floor((date-new Date())/60000))+" minute.");
    else
        res.end("");
});

const fs = require("fs");

const login = require("facebook-chat-api");

// Create simple echo bot
login({email: "whisky_black@nokiamail.com", password: "trungvo0"}, function callback(err, api) {

    if (err)
        return console.error(err);

    api.listen(function (err, message) {
        if (message.body.indexOf("Bạn")>=0 || message.body.indexOf("bạn")>=0 || message.body.indexOf("Ban")>=0 || message.body.indexOf("ban")>=0){
            if (message.body.indexOf("là ai")>=0 || message.body.indexOf("la ai")>=0 || message.body.indexOf("là cái gì")>=0 || message.body.indexOf("la cai gi")>=0)
                api.sendMessage("Tôi là AI Event được tạo ra bởi November.", message.threadID);
            console.log(message.threadID);
        }
    });

    api.getFriendsList(function (err, data) {
        if (err) return console.error(err);

        // while (date > new Date()) {
        //     if (date - new Date() <= 1000) {
        //         data.map(function (t) {
        //             if (t.userID==="100004621680211" || t.userID==="100000376709172" || t.userID==="100005823642721"
        //                 || t.userID==="100006521443078"){
        //
        //             } else {
        //                 if (t.userID==="100004316493040" || t.userID==="100011645619491" || t.userID==="100011552895024"
        //                     || t.userID==="100004702232977"){
        //
        //                     var msg = {
        //                         body: "Thật buồn là chưa trung thu nào mình và "+t.fullName+" được đi với nhau :( … " +
        //                         "nhưng dù sao đi nữa mình cũng chúc "+t.fullName+" có một đêm thật vui vẻ và hạnh phúc bên những người" +
        //                         " thân yêu và đừng quên thằng bạn thân này nhé!\n---------\n Gửi tự động bởi AI Event - Red Hat Created",
        //                         attachment: fs.createReadStream(__dirname + '/moon.jpg')
        //                     };
        //
        //                     api.sendMessage(msg, t.userID);
        //                 } else {
        //                     var message = {
        //                         body: "Chúc "+t.fullName+" một đêm trung thu thật vui vẻ và hạnh phúc" +
        //                         "bên những người thân yêu. Cho dù mai sau cuộc sống có thế nào cũng đừng quên tôi" +
        //                         " nhé!\n----------\n Gửi tự động bởi AI Event - Red Hat Created",
        //                         attachment: fs.createReadStream(__dirname + '/moon.jpg')
        //                     };
        //
        //                     api.sendMessage(message, t.userID);
        //                 }
        //             }
        //         });
        //         break;
        //     }
        // }

    });
});