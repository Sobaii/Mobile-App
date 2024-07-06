import { OcrServiceClient } from "../stubs/ocr-service-dev/Ocr_serviceServiceClientPb";
import { TestRequest, TestResponse, ExtractRequest, SearchRequest, ExtractResponse, Expenses } from "../stubs/ocr-service-dev/ocr_service_pb";

const client = new OcrServiceClient('http://localhost:50052', null, null)

export async function testConnection(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = new TestRequest();
    request.setMessage(message);

    client.testConnection(request, {}, (err, response: TestResponse) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.getResponse());
      }
    });
  });
}

export function extractFileData(file: Uint8Array): Promise<ExtractResponse.AsObject | null> {
  return new Promise((resolve, reject) => {
    const request = new ExtractRequest();
    request.setBinary(file);

    client.extractFileData(request, {}, (err, response: ExtractResponse) => {
        if (err) {
            reject(null);
        } else {
            resolve(response.toObject());
        }
    })
  });
}

export function retrieveExpenses(): Promise<Expenses.AsObject | null> {
  
  return new Promise((resolve, reject) => {
    const request = new SearchRequest()
    request.setIndex("")
    request.setQuery("")

    client.searchFileData(request, {}, (err, response: Expenses) => {
      if (err) {
        reject(null)
      } else {
        resolve(response.toObject())
      }
    })
  })

}