import { OcrServiceClient } from "../stubs/ocr-service-dev/Ocr_serviceServiceClientPb";
import { TestRequest, TestResponse } from "../stubs/ocr-service-dev/ocr_service_pb";

const client = new OcrServiceClient('http://10.0.2.2:50052', null, null)

export async function testConnection(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = new TestRequest();
    request.setMessage(message);

    client.testConnection(request, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.getResponse());
      }
    });
  });
}