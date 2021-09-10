const request = require('request');

const geocode = function(city, cb){
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoibmFuZGhpdGhhIiwiYSI6ImNrdDFyZ2wwMzBkM2gydW56OTRjZGk3YnQifQ.ePimVlqOxQOh-epnOmhchg`, function (error, response, body) {
        if(error){
            cb("error occured", undefined);
            return;
            }
        var obj = JSON.parse(body);
        cb(undefined, obj.features[0].center);
    })
};


module.exports = geocode;