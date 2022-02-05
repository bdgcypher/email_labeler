import fetch from 'node-fetch';
import fileApi from 'file-api';
// const fetch = require('node-fetch');
// const fileApi = require('file-api');
// const fs = require('fs');
const {File, FileReader} = fileApi;


const FILE_PATH = "test.jpg";
const MAX_BYTES_PER_CHUNK = 20971520;
const DATASET_NAME = "test_data_set";
const DOMAIN = 'http://127.0.0.1:8080';


document.getElementById('inputfile')
.addEventListener('change', function() {
    upload_file(this.file[0]);
});

// {  
// var fr=new FileReader();
// fr.onload=function(){
//     document.getElementById('output')
//             .textContent=fr.result;
// }
    
// fr.readAsText(this.files[0].slice(0, 50));
// }

async function start_upload_session(api_key, auth_token, request_body) {
    fetch(DOMAIN + '/dataset/start_upload_session', {method:"POST", headers: {
        'Api-Key': api_key,
        'Authorization': auth_token,
        'Content-Type': 'application/json',
    }, body: JSON.stringify(request_body)})
    .then(response=> {
        if (response.status == 200){
            response.json()
        }
        else {
            return ""
        }
    })
    .then(data=>{
        return data 
    })
}

async function load_data_from_file(file_slice, file_reader) {
    file_reader.readAsArrayBuffer(file_slice);
    var fileByteArray = [];

    file_reader.onload = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
           var arrayBuffer = evt.target.result,
               array = new Uint8Array(arrayBuffer);
           for (var i = 0; i < array.length; i++) {
               fileByteArray.push(array[i]);
            }
            
            return fileByteArray;
        }
        else {
            return fileByteArray;
        }
    }
}

async function send_chunk(session_uri, starting_byte, ending_byte, filesize, chunk_data) {
    let request_body = {
        'starting_byte': starting_byte,
        'ending_byte': ending_byte,
        'object_total_size': filesize,
        'chunk_binary_data': chunk_data
    }

    fetch(DOMAIN + '/dataset/upload_chunk/' + session_uri, {method:"POST", headers: {
        'Api-Key': api_key,
        'Authorization': auth_token,
        'Content-Type': 'application/json',
    }, body: JSON.stringify(request_body)})
    .then(response=>response.status)
    .then(status=>{ return status; })
}

export async function upload_file(file) {
    //fund the file size
    // var fileStats = fs.statSync(file);
    var fileSizeInBytes = file.size;

    //get number of chunks to send
    let num_chunks = fileSizeInBytes / MAX_BYTES_PER_CHUNK;
    if ((fileSizeInBytes % MAX_BYTES_PER_CHUNK) != 0) {
        num_chunks++;
    }

    //Start the upload session
    let api_key = "CXng6YegWR6gAPWtmdqrP5Qc2v22AQV7KU"
    let auth_token = "Bearer fd9ee26a-b684-4fc5-bb9c-b4e3f7d97808:e1d1405f-6585-44e8-a49e-3f2326a5c03c"
    let data = {
        //I am just going to hard code this but you should check
        //make sure it is .mbox
        'dataset_type' : 'mbox',
        'dataset_name' : DATASET_NAME,
        'file_name' : file.slice
    }
    let session_uri = await start_upload_session(api_key, auth_token, data);
    if (session_uri == "") {
        //we failed to get a session_uri
        console.log('We failed to get session_uri.');
        return false;
    }
    document.getElementById("output").innerText = "Session URI: " + session_uri;
    console.log('Session URI: %s', session_uri);

    //get pointer to file
    let starting_byte = 0;
    let ending_byte = starting_byte;
    var reader = new FileReader();
    for (var i = 0; i < num_chunks; i++) {
        if (fileSizeInBytes - starting_byte < MAX_BYTES_PER_CHUNK) {
            ending_byte = fileSizeInBytes;
        }
        else {
            ending_byte = starting_byte + MAX_BYTES_PER_CHUNK - 1;
        }

        //create a pointer to the specified bytes
        let file_slice = file.slice(starting_byte, ending_byte);

        //load the slice into memory from local file
        chunk_data = await load_data_from_file(file_slice, reader);

        //send the chunk to the server
        let return_status = await send_chunk(auth_token, api_key, session_uri, starting_byte, ending_byte, fileSizeInBytes, chunk.toJSON().data);
        document.getElementById("output").innerText = "Chunk " + i + " was uploaded. Status was: " + return_status + ".\n";

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
            starting_byte = ending_byte + 1;
        }
    }

    if (return_status_final == 200 || return_status_final == 201 )
    {
        return true;
    }

    //all chunks uploaded but did not receive complete status code
    return false;
}



//console.log("we uploaded the chunk: %d", await upload_file(FILE_PATH, 'test.jpg'));
