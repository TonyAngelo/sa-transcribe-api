import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    const sorted = result.Items.sort(function(a, b) { 
        return b.createdAt - a.createdAt  ||  a.name.localeCompare(b.name);
      });
    const limited = sorted.slice(0,parseInt(data.limit,10)-1);
    // Return the matching list of items in response body
    return success(limited);
  } catch (e) {
    return failure({ status: e });
  }
}
