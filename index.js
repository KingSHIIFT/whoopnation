var fs = require("fs");
var PlugAPI = require('plugapi');

var PlugAPI = require('plugapi');
var bot = new PlugAPI({
    email: 'l3531425@mvrht.com',
    password: 'password'
});


bot.connect('rap-amp-hiphop-nation'); // The part after https://plug.dj 
 
bot.on('roomJoin', function(room) {
	console.log("Joined " + room);
});
bot.on('userJoin', function(data) {
	bot.sendChat(data.username + ' joined the room.');
});
bot.on('userLeave', function(data) {
	bot.sendChat(data.username + ' left.');
});
bot.on('chat', function(data) {
	if(data.from.role > 0) {
		if (data.message.startsWith('!command')) {
			var x;
			x = data.message.split(' ');
			var z;
			z = x[1];
			var y;
			y = x.splice(2);
			if (x[1].startsWith('!')) {
				fs.writeFile((z + '.txt'), y, (err) => {
					if (err) throw err;
						bot.sendChat('command saved');
				});
			}
		}
		else if (data.message.startsWith('!')) {
			fs.readFile((data.message + '.txt'), 'utf8' , function(err, data){
				if (data !== undefined) {	
					bot.sendChat(data.replace(',', ' '));
				}
			});
		}
	}
});
}
      break;
    case ".forecast":
      if (qualifier === "") {
        bot.sendChat("Try .forecast followed by a US state, city, or zip to look up.");
      } else {
        google_geocoding.geocode(qualifier, function(err, location) {
          if (location !== null) {
            weather.getWeather(location.lat, location.lng, function(err, data) {
              if (data !== null) {
                var weekForecast = "Forecast for " + data.location.areaDescription + ": Current: " + data.currentobservation.Temp + "°F " + data.currentobservation.Weather;
                for (var i = 0; i < 7; i++) {
                  var day = data.time.startPeriodName[i].split('');
                  if (day[1] != 'Night') {
                    weekForecast = weekForecast + "; " + data.time.startPeriodName[i] + ": ";
                  } else {
                    weekForecast = weekForecast + ", ";
                  }
                  weekForecast = weekForecast + data.time.tempLabel[i] + ": " + data.data.temperature[i] + "°F";
                }
                weekForecast = weekForecast.replace(/Sunday/g, 'Sun');
                weekForecast = weekForecast.replace(/Monday/g, 'Mon');
                weekForecast = weekForecast.replace(/Tuesday/g, 'Tues');
                weekForecast = weekForecast.replace(/Wednesday/g, 'Wed');
                weekForecast = weekForecast.replace(/Thursday/g, 'Thurs');
                weekForecast = weekForecast.replace(/Friday/g, 'Fri');
                weekForecast = weekForecast.replace(/Saturday/g, 'Sat');
                bot.sendChat(weekForecast);
              } else {
                bot.sendChat("No weather has been found.");
              }
            });
          } else {
            bot.sendChat("No weather has been found.");
          }
        });
      }
      break;
    case ".temp":
      if (qualifier == "") {
        bot.sendChat("Try .temp followed by a US state, city, or zip to look up.");
      } else {
        google_geocoding.geocode(qualifier, function(err, location) {
          if (location != null) {
            weather.getWeather(location.lat, location.lng, function(err, data) {
              if (data != null) {
                var temp = "Current temperature in " + data.location.areaDescription + ": " + data.currentobservation.Temp + "°F " + data.currentobservation.Weather;
                bot.sendChat(temp);
              } else {
                bot.sendChat("No temperature has been found.");
              }
            });
          } else {
            bot.sendChat("No temperature has been found.");
          }
});
