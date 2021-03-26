const fetch = require('node-fetch');
const path =require('path');
require("dotenv").config({ path: path.join(__dirname, './.env') });

//parameter로 emotion 넣을 것. 현재 test용이라 안넣음.
module.exports = () => {
    // emotion을 받고 나서 여기서 검색 키워드로 변환 할지, emotion을 넣어줄 때 아예 사전에 검색 키워드로 변환해서 넣어 줄 지 정해야 함.
    var url = "https://www.googleapis.com/youtube/v3/search?"
    var optionParams = {
        q: "playlist 슬픈",
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
            const items = result["items"];
            console.log(items)
            console.log(items[0].id.videoId)
            // 목록 중에 가장 위에 있는 것, 그것의 videoId 추출
            // 즉, 프론트 부로 items[0].id.videoId 보내줘야함. But How??
            // res.render('youtube', { items: items });
            
        })
        .catch(function (err) {
            console.log(err)
        })
}