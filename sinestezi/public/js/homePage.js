
var loginSideColors = ['#E91E62', '#B41ABE', '#F9480B','#1AC673'];
var signSideColors = ['#1AC673', '#F9480B', '#B41ABE', '#E91E62']

var colorIndex = 0;



var loginDiv = document.getElementById("loginSideDiv");

var signDiv = document.getElementById("signSideDiv");

loginDiv.style.backgroundColor = loginSideColors[colorIndex];
signDiv.style.backgroundColor = signSideColors[colorIndex];

setInterval(
	()=>{loginDiv.style.backgroundColor = loginSideColors[colorIndex];
		signDiv.style.backgroundColor = signSideColors[colorIndex];
		colorIndex = colorIndex != loginSideColors.length-1?colorIndex+1:0;
	}
	,750);