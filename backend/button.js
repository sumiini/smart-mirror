var GPIO=require('onoff').Gpio;
var button=new GPIO(17, 'in', 'both');
var request=require('request');

module.exports=()=>{
    button.watch(function(err, value){
        if(state==1) {
            request('http://localhost:3001/button');
        }
    });
}