function assignRandomBackground(){
	document.getElementById('analogTexture').style.backgroundImage="url('"+ getSemiRandomBackground() +"')";
}

function forceFore(){
	document.getElementById('c4d').style.backgroundImage="url('"+ c4dGifs[0] +"')";
}

function assignRandomForeground(){
	document.getElementById('c4d').style.backgroundImage="url('"+ getSemiRandomForeground() +"')";
}

function assignRandomPip(){
	document.getElementById('pictureInPicture').style.backgroundImage="url('"+ getSemiRandomUserGif() +"')";
}

function changeElement(){
	//determine which element to swap
	var targetFlag = getRandomInt(0,1);
	if(targetFlag==0){
		assignRandomBackground();
	}else{
		assignRandomForeground();
	}

	//reset the timer again
	setTimeout(changeElement,getRandomInt(waitMin,waitMax));
}

function blinkHash(){
	if(blinkFlag==0){
		document.getElementById('hash').style.color = 'white';
		blinkFlag=1;
	}else{
		document.getElementById('hash').style.color = 'black';
		blinkFlag=0;
		textCounter++
		if(textCounter > 3){
			swapText();
			textCounter=0;
		}
	}
}

function swapText(){
	if(textFlag > 3){
		textFlag=0;
	}
	switch(textFlag)
	{
		case 0:
			document.getElementById('pee').innerHTML = "tweet .gif urls";
			break;
		case 1:
			document.getElementById('pee').innerHTML = "eg http://yr.org/top.gif";
			break;
		case 2:
			document.getElementById('pee').innerHTML = "tag yr .gif";
			break;
		case 3:
			document.getElementById('pee').innerHTML = "#naughtBothered";
			break;
	}
	textFlag++;
}

// size and position the picture in picture
// use golden proportion ala 
// http://www.smashingmagazine.com/2008/05/29/applying-divine-proportion-to-web-design/
function possitionPictureInPicture(){
	var pip = document.getElementById('pictureInPicture');
	var idealHeight = (window.innerWidth-(window.innerWidth/1.62));
	var idealWidth = (window.innerHeight-(window.innerHeight/1.62));
	var aspectHeight = Math.sqrt(idealHeight * idealWidth);
	
	var calculatedHeight = (aspectHeight/1.5)/1.618;
	pip.style.width = aspectHeight/1.5+'px';
	pip.style.height = calculatedHeight+'px';

	/*
	pip.style.width = (window.innerWidth-(window.innerWidth/1.62))/1.5+'px';
	pip.style.height = ((window.innerWidth-(window.innerWidth/1.62))/1.5)/1.618+'px';
	*/
	//pip.style.height = (window.innerHeight-(window.innerHeight/1.62))/1.5+'px';

	pip.style.marginLeft = ((window.innerWidth-(window.innerWidth/1.62))-(window.innerWidth-(window.innerWidth/1.62))/1.5)/3+'px';
	
	var calculatedMargin = ((window.innerHeight-(window.innerHeight/1.62))-(window.innerHeight-(window.innerHeight/1.62))/1.5)/3;
	pip.style.marginTop = calculatedMargin+'px';

	//position and size the PinP label as well
	document.getElementById('hash').style.marginLeft = ((window.innerWidth-(window.innerWidth/1.62))-(window.innerWidth-(window.innerWidth/1.62))/1.5)/3+'px';
	document.getElementById('hash').style.fontSize = window.innerHeight/600+'em';

	//position and size the thank you message for when a twitter user propperly submits a gif
	document.getElementById('newGifIndicator').style.marginLeft = ((window.innerWidth-(window.innerWidth/1.62))-(window.innerWidth-(window.innerWidth/1.62))/1.5)/3+'px';
	document.getElementById('newGifIndicator').style.marginTop = calculatedMargin + calculatedHeight + 5 + 'px';
	document.getElementById('newGifIndicator').style.fontSize = window.innerHeight/600+'em';

	/*
	var dropSize = (window.innerWidth-(window.innerWidth/1.62)) * (window.innerHeight-(window.innerHeight/1.62)) / 13000;
	pip.style.boxShadow = dropSize+'px '+dropSize+'px';
	*/
}

function thankUsers(){
	if(usersToThank.length !== 0)
	{
		var thankText = "thank you<br>" + usersToThank.pop();
		document.getElementById('newGifIndicator').innerHTML = thankText;
		document.getElementById('newGifIndicator').style.opacity = .9;
	}
}

function fadeThanks(){
	document.getElementById('newGifIndicator').style.opacity = document.getElementById('newGifIndicator').style.opacity - .01;
}


