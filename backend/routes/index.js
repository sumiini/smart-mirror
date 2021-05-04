var express = require('express');
var router = express.Router();
var youtubePlay = require('../youtube');
//var ledPlay = require('../led');
var {PythonShell} = require('python-shell');
const path =require('path');
const request = require('request');

let options = {
  pythonPath:'C:/Users/Hong Sumin/smart_mirror_env/Scripts/python'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/button', function(req,res,next){
  // 가주소
  // python shell 실행
  let response;
  const pyPath = path.join(__dirname, "../python/faceRecognition.py");
  PythonShell.run(pyPath, options , async function (err, data) { 
    if (err) throw err;  
    console.log(data);
    //res.render('emotion',{emotion: data})
    youtubePlay({data : data});
   //console.log(youtubePlay(data))
    //response =youtubePlay(data);
     
  });
  //console.log("파이썬밖!!!!!!!!!!!!",response)
});

router.post('/getdata', function(req,res,next){
  console.log(req.body.item[0].id.videoId)
  
})

module.exports = router;