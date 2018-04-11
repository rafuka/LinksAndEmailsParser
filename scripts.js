

var uploadBtn 		= document.getElementById('upload-btn');
var parseBtn 		= document.getElementById('parse-btn');
var inputArea 		= document.getElementById('input-area');
var outputLinks  	= document.getElementById('output-links');
var outputEmails  	= document.getElementById('output-emails');


if (testInputString) { 
	inputArea.value = testInputString;
	inputArea.select();
}


uploadBtn.addEventListener('input', handleUpload, false);
parseBtn.addEventListener('click', handleParse, false);


function handleUpload(event) {

	var file = this.files[0];
	var fr = new FileReader();

	fr.addEventListener('loadend', function(e) {
		inputArea.value = fr.result;
	});

	fr.readAsText(file);	
}

function handleParse(event) {
	event.preventDefault();

	var parseResult = parseLinksAndEmails(inputArea.value);

	if (!parseResult) return false;

	outputLinks.innerHTML = '';
	outputEmails.innerHTML = '';

	if (parseResult.links.length > 0) {
		var links = parseResult.links;
		for (var i = 0; i < links.length; i++) {
			var pLink = document.createElement('p');

			var pUrl = document.createElement('p');
			pUrl.classList.add('link-p');

			var div = document.createElement('div');
			div.classList.add('link-div');
			var divText = 'Link ' + (i+1) + ':';
			var divTextNode = document.createTextNode(divText);


			var pLinkText = 'Text: ' + links[i].linkText;
			var pLinkTextNode = document.createTextNode(pLinkText);

			var pUrlText = 'Url: ' + links[i].url;
			var pUrlTextNode = document.createTextNode(pUrlText);
			
			pLink.appendChild(pLinkTextNode);
			pUrl.appendChild(pUrlTextNode);

			div.appendChild(divTextNode);
			div.appendChild(pLink);
			div.appendChild(pUrl);
			outputLinks.appendChild(div);
		}
	}
	else {

		var textNode = document.createTextNode('no links found');
		outputLinks.appendChild(textNode);
	}

	if (parseResult.emails.length > 0) {
		var emails = parseResult.emails;
		for (var i = 0; i < emails.length; i++) {

			var div = document.createElement('div');
			var divText = 'Email ' + (i+1) + ': ' + emails[i];
			var divTextNode = document.createTextNode(divText);

			div.appendChild(divTextNode);

			outputEmails.appendChild(div);
		}
	}
	else {

		var textNode = document.createTextNode('no emails found');
		outputEmails.appendChild(textNode);
	}
}
