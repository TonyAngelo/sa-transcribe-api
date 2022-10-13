import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";

export async function main(event, context) {
  var transcribeservice = new AWS.TranscribeService();

  try {
    var result = await transcribeservice.listVocabularies({MaxResults: 100}).promise();
    
    return success(result);
  } catch (e) {
    return failure({ status: false });
  }
}
