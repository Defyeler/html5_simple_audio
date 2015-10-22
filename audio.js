function loadSong(which,dir){
	
	var sDir='audio/'; // Directory of song location.
	// First array is file name of songs. Second array is the visual name of song that will display on the bar of the player.
	allSongs=['lg','always','aty','dtily','ikily','jtwya','ngcmlfy'];
	songName=['遊戲愛情','Always','A Thousand Years','I Love You','I Know I\'ve Loved You','Just The Way You Are','Never Gonna Change My Love For You'];
		
	if(which=='new'){
		gSong=Math.floor((Math.random() * allSong.length) + 0);
	} else {
		if (dir=='l'){
			if(which==0){
				nextTrack=allSong.length;
			} else {
				nextTrack=Number(which - 1);
			}				
		} else {
			if(which==5){
				nextTrack=allSong.length;
			} else {
				nextTrack=Number(which + 1);
			}			
		}

		gSong=nextTrack;
	}
		var cSong = new Audio();
		// determine mime-type of audio compatability of web browser, then applies song.
		if (cSong.canPlayType('audio/mpeg;')) {
			cSong.type= 'audio/mpeg';
			cSong.src=sDir+allSongs[gSong]+'.mp3';
		} else {
			cSong.type= 'audio/ogg';
			cSong.src=sDir+allSongs[gSong]+'.ogg';
		}		
		
		$('#trackName').remove();
		
		$('.trackName').append('<span id="trackName">'+songName[gSong]+'</span>');
		
		$('.pause').css({'display':'block'});
		$('.play').css({'display':'none'});
		cSong.volume=($('#audioVolume').attr('value')/100);
		cSong.play();
	
	return [cSong,gSong];
}

function setVolume(value){
	newVolume=(value/100);
	document.getElementById("audioVolume").value=value; // Sets inline value to update slide knob
	document.getElementById("audioVolume").setAttribute('value',value); // Sets actual volume value
	cSong[0].volume=newVolume;
}

$(document).ready(function(){
	cSong=loadSong('new',null);

	$('.play').on('click',function(){
		cSong[0].play();
		$('.pause').css({'display':'block'});
		$('.play').css({'display':'none'});
	});	
	
	$('.pause').on('click',function(){
		cSong[0].pause();
		$('.play').css({'display':'block'});
		$('.pause').css({'display':'none'});
	});
		
	$('.next').on('click',function(){
		cSong[0].pause();
		cSong=loadSong(cSong[1],'l');
	});
	$('.prev').on('click',function(){
		cSong[0].pause();
		cSong=loadSong(cSong[1],'r');
	});
	$('.minVol').on('click',function(){
		setVolume(0);
	});
	$('.maxVol').on('click',function(){
		setVolume(100);
	});
	$('.volControl').on('click',function(){
		$('.volumeShell').fadeIn('fast');
	});
	$('.volumeShell').on('mouseleave',function(){
		$(this).fadeOut('fast');
	});	
	
});
