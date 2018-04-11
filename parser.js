

var testInputString = 'Lorem ipsum dolor <a href="mailto:sit@amet.com">site</a> consectetur <span>adipiscing elit</span>, sed do <strong>eiusmod tempor incididunt</strong> ut <a href="http://exampleurl1.com" >labore et</a> dolore <a href="mailto:magna@aliqua.com">Ut</a>. <em>enim ad minim</em> veniam, <a href="#anchor">quis nostrud</a> exercitation ullamco laboris nisi ut <a href="https://exampleurl2.com">aliquip</a> ex ea commodo consequat.</p>';


function parseLinksAndEmails(inputStr) {
	var returnObject = {
	links: [],
	emails: []
	};

	var linksPattern = /<a.+?"(https?:\/\/.+?)"(?:>|.+?>)(.+?)<\/a>/g;
	var emailsPattern = /"mailto:(.+?)"/g;
	var linksArray = [];
	var emailsArray = [];

	var match;
	var counter = 0;

	while (match = linksPattern.exec(inputStr)) {

		linksArray[counter] = {
			linkText : match[2],
			url : match[1]
		};

		counter++;
	} 


	while (match = emailsPattern.exec(inputStr)) {

		emailsArray.push(match[1]);
	}

	returnObject.links = linksArray;
	returnObject.emails = emailsArray;

	return returnObject;
}







