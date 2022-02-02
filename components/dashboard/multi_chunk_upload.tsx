import fetch from 'node-fetch';
import fileApi from 'file-api';
import * as fs from 'fs';
import { Blob } from 'buffer';
import Cookies from 'universal-cookie';
import { Domain, apiKey } from '../domain'

const cookies = new Cookies();
const user = cookies.get("user")

const {File, FileReader} = fileApi;

const FILE_PATH = "/home/dallin/Downloads/All mail Including Spam and Trash-002.mbox";
const DOMAIN = Domain
const MAX_BYTES_PER_CHUNK = 262145;


function start_upload_session(api_key, auth_token, request_body) {
    return new Promise((resolve, reject) => {
        fetch(DOMAIN + '/dataset/start_upload_session', {method:"POST", headers: {
        'Api-Key': api_key,
        'Authorization': auth_token,
        'Content-Type': 'application/json',
        }, body: JSON.stringify(request_body)})
        .then(response=> {
            if (response.status == 200){
                let response_body = response.json();
                resolve(response_body);
            }
            else {
                reject("Response code was not 200");
            }
        })
    })
    
}

function load_data_from_file(file_slice, file_reader) {
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

function send_chunk(auth_token, api_key, session_uri, starting_byte, ending_byte, filesize, chunk_data) {
    return new Promise((resolve, reject) => {
        if (ending_byte - starting_byte < MAX_BYTES_PER_CHUNK - 1) {
            ending_byte = filesize -1;
        }
        let request_body = {
            'session_uri': session_uri,
            'starting_byte': starting_byte,
            'ending_byte': ending_byte,
            'object_total_size': filesize,
            'chunk_binary_data': chunk_data
        }

        fetch(DOMAIN + '/dataset/upload_chunk/', {method:"POST", headers: {
            'Api-Key': api_key,
            'Authorization': auth_token,
            'Content-Type': 'application/json',
        }, body: JSON.stringify(request_body)})
        .then(response=> {
            resolve(response.status); 
        })
    });
}

async function upload_file(file_path, file_name) {
    //fund the file size
    var fileStats = fs.statSync(file_path);
    var fileSizeInBytes = fileStats.size;

    //Start the upload session
    let api_key = apiKey
    let auth_token = user.token
    let data = {
        //I am just going to hard code this but you should check
        //make sure it is .mbox
        'dataset_type' : 'mbox',
        'dataset_name' : 'multi_chunk_test',
        'file_name' : file_name
    }
    let session_uri = await start_upload_session(api_key, auth_token, data);
    if (session_uri == "Response code was not 200") {
        //we failed to get a session_uri
        console.log('We failed to get session_uri.');
        return false;
    }
    console.log('Session URI: %s', session_uri);

    //break file into chunks and send them
    let starting_byte = 0;
    let ending_byte = 0;
    const stream = fs.createReadStream(file_path, {highWaterMark: MAX_BYTES_PER_CHUNK,
        start: 0,
        end: fileSizeInBytes
    });
    let return_status_final: any  = 0;
    for await(let chunk of stream) {
        if((fileSizeInBytes - starting_byte) < MAX_BYTES_PER_CHUNK - 1) {
            //there is some jank stuff going on and this is the fix
            //dont question it
            const temp_stream = fs.createReadStream(file_path, {start: starting_byte, end: fileSizeInBytes});
            chunk = [];
            for await(let final_chunk of temp_stream) {
                chunk = final_chunk;
            }
        }
        ending_byte += chunk.length-1;
        let return_status = await send_chunk(auth_token, api_key, session_uri, starting_byte, ending_byte, fileSizeInBytes, chunk.toJSON().data);
        return_status_final = return_status;

        //check the return status
        if (return_status != 200 && return_status != 201 && return_status != 207) {
            // chunk upload failed, try again
            let second_status = await send_chunk(auth_token, api_key, session_uri, starting_byte, ending_byte, fileSizeInBytes, chunk.toJSON().data);

            if (second_status != 200 && second_status != 201 && second_status != 207) {
                //failed again to upload, exit to avoid infinite loop
                console.log('Chunk upload failed twice'); 
                return false;
            }
        }
        else {
            //status code == 308
            starting_byte = ending_byte;
        }
    }

    if (return_status_final == 200 || return_status_final == 201 )
    {
        return true;
    }

    //all chunks uploaded but did not receive complete status code
    return false;

}

console.log("we uploaded the chunk: %d", upload_file(FILE_PATH, 'test.jpg'));
