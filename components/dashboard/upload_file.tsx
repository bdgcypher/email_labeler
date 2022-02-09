import React, { Component } from 'react';
import { Dialog } from '@headlessui/react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Domain, apiKey } from '../domain';
import Cookies from 'universal-cookie';
import UploadSuccessful from './upload_successful';
import UploadError from './upload_error';

const cookies = new Cookies();
const user = cookies.get('user')

const MAX_BYTES_PER_CHUNK = 1048576;


class FileUploader extends Component {

  state = {
    // Initially, no file is selected
    selectedFile: null,
    datasetName: '',
    filesChosen: false,
    uploadStarted: false,
    uploadProgress: 0,
    uploadProgressPercentage: 0,
    outOf: 0,
    uploadSuccessful: false,
    uploadError: false,
  };



  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0], filesChosen: true });

  };

  start_upload_session(api_key, auth_token, request_body): Promise<{ session_uri: string, dataset_id: string }> {
    return new Promise((resolve, reject) => {
      fetch(Domain + '/dataset/start_upload_session', {
        method: "POST", headers: {
          'Api-Key': api_key,
          'Authorization': auth_token,
          'Content-Type': 'application/json',
        }, body: JSON.stringify(request_body)
      })
        .then(response => {
          if (response.status == 200) {
            let response_body = response.json();
            resolve(response_body);
          }
          else {
            reject("Response code was not 200");
          }
        })
    })

  }

  continue_upload_session(api_key, auth_token, request_body, dataset_id): Promise<{ session_uri: string, dataset_id: string }> {
    return new Promise((resolve, reject) => {
      fetch(Domain + '/dataset/start_upload_session?dataset_id=' + dataset_id, {
        method: "POST", headers: {
          'Api-Key': api_key,
          'Authorization': auth_token,
          'Content-Type': 'application/json',
        }, body: JSON.stringify(request_body)
      })
        .then(response => {
          if (response.status == 200) {
            let response_body = response.json();
            resolve(response_body);
          }
          else {
            reject("Response code was not 200");
          }
        })
    })

  }

  load_data_from_file(file_slice, file_reader) {
    return new Promise((resolve, reject) => {
      file_reader.readAsArrayBuffer(file_slice);
      var fileByteArray = [];

      file_reader.onload = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
          var arrayBuffer = evt.target.result,
            array = new Uint8Array(arrayBuffer);
          for (var i = 0; i < array.length; i++) {
            fileByteArray.push(array[i]);
          }
          resolve(fileByteArray);
        }
        else {
          reject(fileByteArray);
        }
      }
    })

  }

  load_buffer_to_array(array_buffer) {
    return new Promise((resolve, reject) => {
      var fileByteArray = [];

      let array = new Uint8Array(array_buffer);
      for (var i = 0; i < array.length; i++) {
        fileByteArray.push(array[i]);
      }
      resolve(fileByteArray);
    })

  }


  send_chunk(auth_token, api_key, session_uri, starting_byte, ending_byte, filesize, chunk_data) {
    return new Promise((resolve, reject) => {
      let url = Domain + '/dataset/upload_chunk?';
      url = url + "starting_byte=" + starting_byte + "&ending_byte=" + ending_byte;
      url = url + "&total_size=" + filesize;

      fetch(url, {
        method: "POST", headers: {
          'Api-Key': api_key,
          'Authorization': auth_token,
          'Session-Uri': session_uri
        }, body: chunk_data
      })
        .then(response => {
          response.status ? (
          resolve(response.status)
          ) : (
            resolve(408)
          )
        })
    });
  }

  // On file upload (click the upload button)
  onFileUpload = async () => {
    var startTime = performance.now()
    var file = this.state.selectedFile;
    var fileType = file.type;

    console.log('starting upload')
    console.log(user.token)
    this.setState({ uploadStarted: true })

    //Start the upload session
    let api_key = apiKey;
    let auth_token = user.token
    let data = {
      //I am just going to hard code this but you should check
      //make sure it is .mbox
      'file_type': "mbox",
      'dataset_name': this.state.datasetName,
      'file_name': file.name
    }
    var response_body = await this.start_upload_session(api_key, auth_token, data);
    if (response_body.session_uri == "") {
      //we failed to get a session_uri
      console.log('We failed to get session_uri.');
      return false;
    }
    let session_uri = response_body.session_uri;
    let dataset_id = response_body.dataset_id;
    console.log('Session URI: %s', session_uri);

    //get the file size    
    var fileSizeInBytes = file.size;

    //get number of chunks to send
    let num_chunks = Math.ceil(fileSizeInBytes / MAX_BYTES_PER_CHUNK);
    console.log(`Num chunks: ${num_chunks}`);
    this.setState({ outOf: fileSizeInBytes });


    //setup boundarys for chunks
    let starting_byte = 0;
    let ending_byte = starting_byte;
    let bytes_uploaded = 0;
    var startTime = performance.now()

    for (var i = 0; i < num_chunks; i++) {
      //prints progress every 10 chunks
      //use this to update the progress bar
      if (i % 1 == 0) {
        console.log(`We have uploaded ${bytes_uploaded} bytes`);
        console.log(`We have uploaded ${i} chunks out of ${num_chunks}`);
        this.setState({ uploadProgress: bytes_uploaded });
        this.setState({ uploadProgressPercentage: 100 * (bytes_uploaded / fileSizeInBytes) });
        console.log(this.state.uploadProgressPercentage, "% done");
      }

      //calculate the ending_byte of the next chunk
      if (fileSizeInBytes - starting_byte < MAX_BYTES_PER_CHUNK) {
        ending_byte = fileSizeInBytes;
      }
      else {
        ending_byte = starting_byte + MAX_BYTES_PER_CHUNK;
      }

      //create a pointer to the specified chunk
      let file_slice = file.slice(starting_byte, ending_byte);

      //send the chunk to the server
      ending_byte = ending_byte - 1;
      let return_status = await this.send_chunk(auth_token, api_key, session_uri, starting_byte, ending_byte, fileSizeInBytes, file_slice);

      //check the return status
      if (return_status != 200 && return_status != 201 && return_status != 207) {
        // chunk upload failed, try again
        let second_status = await this.send_chunk(auth_token, api_key, session_uri, starting_byte, ending_byte, fileSizeInBytes, file_slice);

        if (second_status != 200 && second_status != 201 && second_status != 207) {
          //failed again to upload, exit to avoid infinite loop
          console.log('Chunk upload failed twice');

          var endTime = performance.now()
          console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
          this.setState({ uploadStarted: false, uploadError: true });

          return false;
        }
      }

      //update bounds for next chunk
      starting_byte = ending_byte + 1;
      bytes_uploaded = starting_byte;
    }

    // print the total time it took to upload the file
    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    this.setState({ uploadStarted: false, uploadSuccessful: true });


    return true;
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>


          <p>File Type: {this.state.selectedFile.type}</p>


          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {

    return (
      <>
        {this.state.uploadStarted ? (

          <>
            <div className="mt-3 mb-4 text-center sm:mt-5 px-6">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Upload In Progress
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  This may take a while, so sit tight. You are almost done.
                </p>
              </div>
            </div>
            <hr className="h-px my-2 bg-gray-500" />
            <div className="flex flex-row">
              <div className="px-4 sm:p-6">
                <dt className="text-base font-normal text-gray-900">Uploaded</dt>
                <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-blue-600">
                    {this.state.uploadProgress}
                    <span className="ml-2 text-sm font-medium text-gray-500">of {this.state.outOf} bytes</span>
                  </div>
                </dd>

              </div>
              <div className="m-auto">
                <Stack spacing={2} direction="row">
                  <CircularProgress variant="determinate" value={this.state.uploadProgressPercentage} />
                </Stack>
              </div>
            </div>
          </>

        ) : this.state.uploadSuccessful ? (
          <>
            <UploadSuccessful />
          </>
        ) : this.state.uploadError ? (
          <>
            <UploadError />
            <button onClick={() => { this.setState({ uploadError: false }) }} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm mt-4 px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
              Continue
            </button>
          </>
        ) : (
          <>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Upload Email Data
              </Dialog.Title>
              <div className="mt-2 px-4">
                <p className="text-sm text-gray-500">
                  Once the email data has finished downloading, upload the file by selecting the file and clicking the button below.
                </p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <input type="text" onChange={(e) => { this.setState({ datasetName: e.target.value }) }} name="datasetName" placeholder="Name your dataset" className="h-8 pl-2 mt-6 mb-2 w-full rounded-md border-2 border-b-blue-500" />
                <input type="file" onChange={this.onFileChange} multiple className="mb-4 w-full rounded-md border-2 border-b-blue-500" />
                {
                  this.state.filesChosen ? (
                    <button onClick={this.onFileUpload} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                      Upload
                    </button>
                  ) : (
                    <button className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white sm:text-sm">
                      Upload
                    </button>
                  )
                }


              </div>
              {/* {this.fileData()} */}
            </div>
          </>
        )}

      </>
    );
  }
}

export default FileUploader;