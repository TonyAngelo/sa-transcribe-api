import AWS from "aws-sdk";
var transcribeservice = new AWS.TranscribeService();

export function list(name) {
	transcribeservice.listVocabularies({ NameContains: name }, function(err, data) {
	  	if (err) {
	  		console.log(err, err.stack); // an error occurred
	  		return 'error'
	  	} else {  
	  		console.log(data);           // successful response
	  		return data
		}
	});
}
