//CONFIG

var waitMax = 11000;
var waitMin = 7000;
var previousBackground, previousForeground, previousUser;
var blinkFlag;
var textFlag = 0;
var textCounter = 0;
var twitterSearch;





//at the very start assign a random background and random foreground
//set a random element every so often after that (randomize time, randomize element)
window.onload = function(){
	assignRandomBackground();
	assignRandomForeground();
	assignRandomPip();
	possitionPictureInPicture();
	swapText();
	setTimeout(changeElement,getRandomInt(waitMin,waitMax));
	setInterval(blinkHash,700);
	setInterval(assignRandomPip,3000);
	
	//on interval
	//call a function to show any new material in newGifIndicator
	//and fade it out
	setInterval(thankUsers,8000);
	setInterval(fadeThanks,80);

	//supposidly the search api can be hit once every second by an application according to
	// https://dev.twitter.com/discussions/3738
	// https://dev.twitter.com/docs/rate-limiting/1#search
	//but i think we're fine going slower than that 
	//to give people the impression of realtime interactivity
	callTwitter();
	setInterval(callTwitter,30000);
}

window.onresize = function(event) {
    possitionPictureInPicture();
}


