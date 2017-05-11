$(document).ready(function(){


	var streamers = [ "freecodecamp", "llstylez", "ESL_SC2", "OgamingSC2", "dyrus",
						"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
						"comster404"];



	function createPanel(game, status, channelName, channelUrl, online, logo,){
		$(".streamers").append('<div role="tabpanel" class="tab-pane active panel panel-default" id="online">'+
						'<div class="panel-heading">' +
						'<img class="img-resposnive img "src="' + logo + '">' +
						'<h3><a href="' + channelUrl+ '">' + channelName +'</a></h3>' +
						'</div> <!-- panel heading -->'+
						'<div class="panel-body">'+
						'<h3><strong>Is playing: </strong>' + game + '</h3></br>'+
						'<h4>' + status + '<h4>'+
						'</div>'+
						'</div>');
}

	function createOfflinePanel(streamer){

		$.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + streamer+ "?callback=?", function(data){
			var channelStatus = data.status;
			if(channelStatus == 422){
				console.log(channelStatus);
				$(".streamers").append('<div role="tabpanel" class="tab-pane panel panel-default" id="">'+
								'<div class="panel-heading">' +
								'<img class="img-resposnive img "src="' + img + '">' +
								'<h3><a href="https://www.twitch.tv/' + streamer +'">'+streamer +'</a></h3>' +
								'</div>'+
								'<div class="panel-body">'+
								'<h3>This channel is not available.</h3></br>'+
								'<small>Error: ' + channelStatus + '</small></div></div>'
								);
			}
			else if(channelStatus == 404){
				$(".streamers").append('<div role="tabpanel" class="tab-pane panel panel-default" id="">'+
								'<div class="panel-heading">' +
								'<img class="img-resposnive img "src="' + img + '">' +
								'<h3><a href="https://www.twitch.tv/' + streamer +'">'+streamer +'</a></h3>' +
								'</div>'+
								'<div class="panel-body">'+
								'<h3>This channel does not exist :( </br>'+
								'<small>Error: ' + channelStatus +'</small></div></div>'
								);
			}
			else{
				var img = data.logo;
				$(".streamers").append('<div role="tabpanel" class="tab-pane panel panel-default" id="offline">'+
								'<div class="panel-heading">' +
								'<img class="img-resposnive img "src="' + img + '">' +
								'<h3><a href="https://www.twitch.tv/' + streamer +'">'+streamer +'</a></h3>' +
								'</div>'+
								'<div class="panel-body">'+
								'<h3>This channel is currently offline.</h3></br>	'+
								'<h4><strong>Watch his last vods <a href="https://www.twitch.tv/' + streamer +'/videos/all">'+
								'here</strong>.</a></h3></div></div>'
								);
		}


		});
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
				createOfflinePanel(streamer);
			}



			}); //getJSON end

			});




});