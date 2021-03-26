var express = require('express');
var router = express.Router();
var youtubePlay = require('../youtube');
var ledPlay = require('../led');
var {PythonShell} = require('python-shell');
const path =require('path');
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/button', function(req,res,next){
  // 가주소
  // python shell 실행
  const pyPath = path.join(__dirname, "../python/faceRecognition.py");
  PythonShell.run(pyPath, { args: [] }, function (err, data) { 
    if (err) throw err;  
    console.log(data);
    //res.render('emotion',{emotion: data})
    // emotion을 받고 나서 여기서 검색 키워드로 변환 할지, 
    // emotion을 넣어줄 때 아예 사전에 검색 키워드로 변환해서 넣어 줄 지 정해야 함.
    youtubePlay(data);
    //emotion에 대한 색깔 변환 필요.
    // ledPlay(color);
  });
});

module.exports = router;
