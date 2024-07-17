import { OcrServiceClient } from "../stubs/ocr-service-dev/Ocr_serviceServiceClientPb";
import { FolderCreationRequest, FolderCreationResponse, FolderSearchRequest, FolderSearchResponse, ExtractFileRequest, SearchFileRequest, ExtractFileResponse, MimeType, SearchFileResponse } from "../stubs/ocr-service-dev/ocr_service_pb";

const client = new OcrServiceClient('http://localhost:50052', null, null)

export async function createFolder(emailAddress: string, fullName: string, folderName: string): Promise<FolderCreationResponse.AsObject | null> {
  return new Promise((resolve, reject) => {
    const request = new FolderCreationRequest()
    request
    .setEmailAddress(emailAddress)
    .setFullName(fullName)
    .setFolderName(folderName)

    client.createFolder(request, {}, (err, response: FolderCreationResponse) => {
      if (err) {
        reject(null)
      } else {
        resolve(response.toObject())
      }
    })
  })
}

export async function retrieveFolders(emailAddress: string): Promise<FolderSearchResponse.AsObject | null> {

  return new Promise((resolve, reject) => {
    const request = new FolderSearchRequest();
    request
    .setEmailAddress(emailAddress)
    .setQuery("")

    client.searchFolders(request, {}, (err, response: FolderSearchResponse) => {
      if (err) {
        reject(null)
      } else {
        resolve(response.toObject())
      }
    })
  })
}

export async function extractFileData(emailAddress: string, folderName: string, file: Uint8Array, mimeType: MimeType): Promise<ExtractFileResponse.AsObject | null> {
  return new Promise((resolve, reject) => {
    const request = new ExtractFileRequest();
    request
    .setEmailAddress(emailAddress)
    .setFolderName(folderName)
    .setBinary(file)
    .setMimeType(mimeType)

    client.extractFileData(request, {}, (err, response: ExtractFileResponse) => {
        if (err) {
            reject(null);
        } else {
            resolve(response.toObject());
        }
    })
  });
}

export async function retrieveExpenses(): Promise<SearchFileResponse.AsObject | null> {
  
  return new Promise((resolve, reject) => {
    const request = new SearchFileRequest()
    request
    .setEmailAddress("")
    .setFolderName("")
    .setIndex("")
    .setQuery("")

    client.searchFileData(request, {}, (err, response: SearchFileResponse) => {
      if (err) {
        reject(null)
      } else {
        resolve(response.toObject())
      }
    })
  })

}