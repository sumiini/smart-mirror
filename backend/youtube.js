var express = require('express');
//var app = express();
var router = express.Router();
const socketio = require('socket.io')
const fetch = require('node-fetch');
const path =require('path');
global._ = require('underscore');
require("dotenv").config({ path: path.join(__dirname, './.env') });
//let uid = "";

router.io = require('socket.io')();
//parameter로 emotion 넣을 것. 현재 test용이라 안넣음.
module.exports = (data) => {
    // emotion을 받고 나서 여기서 검색 키워드로 변환 할지, emotion을 넣어줄 때 아예 사전에 검색 키워드로 변환해서 넣어 줄 지 정해야 함.
    console.log(typeof data.toString())
    let emotion;
    if(data.data.toString()==="anger"){
        emotion="화난";
    }
    if(data.data.toString()==="contempt"){
        emotion="치유";
    }
    if(data.data.toString()==="disgust"){
        emotion="기분전환";
    }
    if(data.data.toString()==="fear"){
        emotion="안정";
    }
    if(data.data.toString()==="happiness"){
        emotion="행복";
    }
    if(data.data.toString()==="neutral"){
        emotion="잔잔";
    }
    if(data.data.toString()==="sadness"){
        emotion="슬픈";
    }
    if(data.data.toString()==="surprise"){
        emotion="일상";
    }
    
    var url = "https://www.googleapis.com/youtube/v3/search?"
    var optionParams = {
        q: "playlist "+emotion,
        part: "snippet",
        key: process.env.YOUTUBE_KEY,
        type: "video",
        maxResults: 10,
        regionCode: process.env.REGION,
    };
    console.log(process.env.YOUTUBE_KEY)
    console.log(process.env.REGION)
    console.log(optionParams)
    optionParams.q = encodeURI(optionParams.q);
    for (var option in optionParams) {
        console.log("option",option)
        url += option + "=" + optionParams[option] + "&";
    }

    //url의마지막에 붙어있는 & 정리
    url = url.substr(0, url.length - 1);
    console.log("url:",url);
    fetch(url).then(function (response) {
        // console.log(response)
        return response.json();
    })
    .then(function (result) {
        //console.log(result)
        const items = result["items"]
        global.uid = items[0].id.videoId
        let Globals={
            'id':items[0].id.videoId
        }
        module.exports=Globals;
        
    })
    .catch(function (err) {
        console.log(err)
    })
      
}