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
