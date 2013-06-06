var http = require('http');

var options = {
  host: 'staging.piranha.ee',
  path: '/healthcheck'
};


var makeCall = function(cb){
  try {
    callback = function(response) {
      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        if (str.indexOf('ok')==0){
          cb();
        } else {
          cb("unexpected response: "+ str);
        }
      });

      response.on('error', function (err) {
        cb(err); 
      });
    }

    var req = http.request(options, callback);
    req.on("error", function(err){
      cb(err);
    });
    req.end();
  } catch (err) {
    cb(err);
  }
} 


setInterval(makeCall(function(err){
  if (!err) {
    console.log("Site is up!");
    process.exit(0);
  } else {
    console.log("Site is not (yet) up: ", err);
  }
}),1000*30)

setTimeout(function(){
  console.log("Did not get healtcheck response in 3 minutes");
  process.exit(1);
}, 1000*60*3)
