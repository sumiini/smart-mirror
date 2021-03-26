
var ws281x = require('../lib/ws281x-native');

// parameter로 color 넣자.
module.exports=()=>{
    //brightness.js 참고

    var NUM_LEDS = 30;
    var pixelData = new Uint32Array(NUM_LEDS);

    ws281x.init(NUM_LEDS);

    // ---- trap the SIGINT and reset before exit
    process.on('SIGINT', function () {
    ws281x.reset();
    process.nextTick(function () { process.exit(0); });
    });

    for(var i = 0; i < NUM_LEDS; i++) {
        pixelData[i] = 0xffcc22;
        // color 넣어주는 부분. color 코드를 파라미터로 넣으면 될듯 함.
        // pixelData[i] = color;
    }
    ws281x.render(pixelData);

    // ---- animation-loop
    // 깜빡이는 부분인데 이건 그냥 뺐음.
    // var t0 = Date.now();
    // setInterval(function () {
    //     var dt = Date.now() - t0;

    //     ws281x.setBrightness(
    //         Math.floor(Math.sin(dt/1000) * 128 + 128));
    // }, 1000 / 30);

    console.log('Press <ctrl>+C to exit.');

};