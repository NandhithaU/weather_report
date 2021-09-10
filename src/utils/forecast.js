const request = require('request');

const forecast = function (data, cb) {
    
    request(`http://api.weatherstack.com/current?access_key=00705d0ce8b11d49e9453264207d43a4&query=${data[1]},${data[0]}`, function (error, response, body) {
        if(error){
            cb("error occured", undefined);
            return;
            }

        var obj = JSON.parse(body);
        cb(undefined, obj.current.weather_descriptions[0])
    })
}    

    
module.exports = forecast;