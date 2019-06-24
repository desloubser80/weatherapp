const request = require('request');

var getLatLong = (city,callback)=>
{
    const mbUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token=pk.eyJ1IjoiZGVzc2VyIiwiYSI6ImNqdzYyeHk3ZDBwdGc0YW1zYmtubGE4bXoifQ.mx8d9Khbn1bOnnq33gogEw&limit=1';

    request 
    (
        {
            url:mbUrl,
            json:true
        },
        (error,response)=>
        {
            if(error)
            {
                callback ("Mapbox failure",undefined);
            }
            else if(response.body.features.length == 0)
            {
                callback ("Could not find such a city",undefined);
            }
            else 
            {
                var lat = response.body.features[0].center[1];
                var long = response.body.features[0].center[0];

                callback(undefined,{lat,long});
            }
        }
    );
    
}

module.exports = getLatLong;



