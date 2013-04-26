var shuffledCinema4dGifs = new Array();
var c4dGifs = [
	"./from-cam/tritwist.gif",
	"./from-cam/glassreflection.gif",
	"./from-cam/Spherify.gif",
	"./from-cam/Squish-cube.gif",

	"./from-cam/glasstri.gif",
	"./from-cam/pinksperm.gif",
	"./from-cam/ballsmash.gif",
	"./from-cam/symmetry.gif",
	"./from-cam/toruspaper.gif",

	"./from-cam/nipple.gif",
	"./from-cam/jizzcircle.gif",

	"./from-cam/alpha_circle.gif",
	"./from-cam/crymid.gif",
	"./from-cam/celshader.gif",
	"./from-cam/neon_sphere.gif",
	"./from-cam/blackandgoldfun.gif",

	"./from-cam/gunfun.gif",
	"./from-cam/jordan_square_gray.gif",
	"./from-cam/hatebox.gif",
	"./from-cam/pink-n-blue.gif",
	"./from-cam/giffun.gif"
];

var shuffledAnalogTextureGifs = new Array();
var analogTextureGifs = [
	"./from-jordan/20130316-181626_1.gif",
	"./from-jordan/20130323-172146_1.gif",
	"./from-jordan/20130323-201250_1.gif",
	"./from-jordan/20130323-232012_1.gif",
	"./from-jordan/20130403-215523_2.gif",

	"./from-jordan/20130316-181015_1.gif",
	"./from-jordan/20130323-171825_1.gif",
	"./from-jordan/20130323-200710_1.gif",
	"./from-jordan/20130323-230755_1.gif",
	"./from-jordan/20130402-232107_1.gif",

	"./from-jordan/20130316-171718_2.gif",
	"./from-jordan/20130323-171605_1.gif",
	"./from-jordan/20130323-193114_1.gif",
	"./from-jordan/20130323-230137_1.gif",
	"./from-jordan/20130402-231936_1.gif",

	"./from-jordan/20130316-171638_1still.gif",
	"./from-jordan/20130316-191650_1.gif",
	"./from-jordan/20130323-182632_1.gif",
	"./from-jordan/20130323-225923_1.gif",
	"./from-jordan/20130323-234326_1.gif",

	"./from-jordan/20130316-163103_1.gif",
	"./from-jordan/20130316-182423_1.gif",
	"./from-jordan/20130323-172355_1.gif",
	"./from-jordan/20130323-201811_1.gif",
	"./from-jordan/20130323-234257_1.gif",
	"./from-jordan/20130403-231532_2.gif",

	"./from-jordan/20130403-215824_1.gif",
	"./from-jordan/20130323-232805_1.gif",
	"./from-jordan/20130323-201456_1.gif",
	"./from-jordan/20130323-172248_1.gif",
	"./from-jordan/20130316-181658_1.gif",
	"./from-jordan/20130316-154607_4.gif"
];

//need at least 3 to start with or selecting a random one will fail
var shuffledUserGifs = new Array();
var userGifs = [
	"./from-twitter/starpause-enso-graf.gif",
	"./from-twitter/1350689896852.gif",
	"./from-twitter/favicon.gif"
]

var usersToThank = new Array();

var shortUrls = new Array();

/*\
/*\ TWITTER PROXY
\*/
/*\
/*\ twitter search results without an api key, jsonp technique from 
/*\ http://htmlcssjavascript.com/web/twitter-search-results-with-json-and-callbacks/
\*/

function parseTwitterData(obj){
	for(i=0;i<obj.results.length;i++)
	{
		var urls = findUrls(obj.results[i].text);
		for(j=0;j<urls.length;j++){
			addShortUrl(urls[j],obj.results[i].from_user);
		}
	}
}

function addShortUrl(shortUrl,userName){
	//check if we already have the short url
	//if we do not, add it to short urls and expand it too
	//if we do have it, forget about it
	var newShortUrl = addUniqueStringToArray(shortUrl,shortUrls);
	if(newShortUrl==true)
	{
		longRequest(shortUrl,userName);
	}
}

function callTwitter() {
	FlyJSONP.get({
		url: 'http://search.twitter.com/search.json',
		parameters: {
		    'q': '#naughtBothered',
		    'rpp':'100',
		    'result_type': 'recent',
		    'user-agent': 'naughtBothered'
		},
		success: function (data,originalParameters) {
			parseTwitterData(data);
		},
		error: function (errorMsg) {
			console.log(errorMsg);
		}
	});
}

/*\
/*\ LONGURL PROXY
\*/
/*\ helper functions to expand short urls to long ones
/*\ relies entirely on http://longurl.org/api hope that never goes down LOL
\*/

function parseLongURL(obj,userName){
	var longUrl = obj['long-url'];
	if(extractExtension( longUrl.toLowerCase() ) == '.gif' )
	{
		var newUniqueGif = addUniqueStringToArray(longUrl,userGifs);
		if(newUniqueGif==true)
		{
			addUniqueStringToArray('@'+userName,usersToThank);
		}
	}
}

function thankUserOnce(userNameWithSymbol){
	var dupeFlag = false;
	for(m=0;m<usersToThank.length;m++)
	{
		if(usersToThank[m]==userNameWithSymbol)
		{
			dupeFlag=true;
		}
	}
	if(dupeFlag==false)
	{
		usersToThank.push(userNameWithSymbol);
	}
}

function longRequest(shortUrl,userName){
	FlyJSONP.get({
		url: 'http://api.longurl.org/v2/expand',
		parameters: {
		    url: shortUrl,
		    format: 'json',
		    'user-agent': 'naughtBothered',
		    'userName': userName
		},
		success: function (data,originalParameters) {
			parseLongURL(data,originalParameters['userName']);
		},
		error: function (errorMsg) {
			console.log(errorMsg);
		}
	});
}

/*\
/*\ SEMI RANDOM business 
\*/
/*\ because we want to see all gifs before re-showing any gif
/*\ 
\*/

function getSemiRandomForeground(){
	//if the copy array length is zero, fill her up & shuffle!
	if(shuffledCinema4dGifs.length==0)
	{
		shuffledCinema4dGifs = c4dGifs.slice();
		shuffledCinema4dGifs = shuffledCinema4dGifs.shuffle();
	}
	//pop a gif off the shuffled array
	return shuffledCinema4dGifs.pop();
}

function getSemiRandomBackground(){
	//if the copy array length is zero, fill her up & shuffle!
	if(shuffledAnalogTextureGifs.length==0)
	{
		shuffledAnalogTextureGifs = analogTextureGifs.slice();
		shuffledAnalogTextureGifs = shuffledAnalogTextureGifs.shuffle();
	}
	//pop a gif off the shuffled array
	return shuffledAnalogTextureGifs.pop();
}

function getSemiRandomUserGif(){
	//if the copy array length is zero, fill her up & shuffle!
	if(shuffledUserGifs.length==0)
	{
		shuffledUserGifs = userGifs.slice();
		shuffledUserGifs = shuffledUserGifs.shuffle();
	}
	//pop a gif off the shuffled array
	return shuffledUserGifs.pop();
}

