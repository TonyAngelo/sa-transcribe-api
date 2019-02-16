import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  //const data = JSON.parse(event.body);
  var transcribeservice = new AWS.TranscribeService();

  try {
    var result = await transcribeservice.listVocabularies().promise();
    //console.log(result);
    
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
