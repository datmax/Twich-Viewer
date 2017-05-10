$(document).ready(function(){

	var streamers = [ "freecodecamp", "llstylez", "ESL_SC2", "OgamingSC2", "dyrus",
						"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
						"comster404"];


	function isOnline(online){
		if(online){
			return "online";
		}
		else{
			return "offline";
		}
	}

	function createPanel(game, status, channelName, channelUrl, online, logo,){
		if(isOnline(online)){
			$(".streamers").append('<div class="panel panel-default online">'+
									'<div class="panel-heading">' +
									'<img class="img-resposnive img "src="' + logo + '">' +
									'<h3><a href="' + channelUrl+ '">' + channelName +'</a></h3>' +
									'</div> <!-- panel heading -->'+
									'<div class="panel-body">'+
									'<h4>Is playing: ' + game + '</h4></br>'+
									'<h5>' + status + '<h5>'+
									'</div>'+
									'</div>');
			}
		}

	function createOfflinePanel(streamer, _link){
		if(_link == "https://api.twitch.tv/kraken/channels/undefined"){
			$(".streamers").append('<div class="panel panel-default offline">'+
								'<div class="panel-heading">' +
								'<img class="img-resposnive img src="">' +
								'<h3>' + streamer +'does not exist.</h3>' +
								'</div>');
		}
		else{
			$(".streamers").append('<div class="panel panel-default offline">'+
								'<div class="panel-heading">' +
								'<img class="img-resposnive img src="">' +
								'<h3><a href="https://www.twitch.tv/' + streamer +'">'+streamer +'</a> is currently offline</h3>' +
								'</div>');
		}
		}
		
		function returnStreamer(index){
			return streamers[index];
		}



	streamers.forEach(function(streamer){

			$.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamer + "?callback=?",
			function(data){
				console.log(data);
				if(data.stream !== undefined && data.stream !== null){
				var channelName = data.stream.channel.display_name;
				var game = data.stream.channel.game;
				var status = data.stream.channel.status;
				var channelUrl = data.stream.channel.url;
				var online = true;
				var logo = data.stream.channel.logo;
				createPanel(game, status, channelName, channelUrl, online, logo);
			}
			else{
				var _link = data._links.channel;
				console.log(_link);
				createOfflinePanel(streamer, _link);
			}



			}); //getJSON end

			});




});