import React from 'react';
import {upload_file} from '../filereader_multi.js'

export default function UploadFile() {
    return (
        <div>
            <input onChange={()=>{upload_file(this.file[0])}} type="file" name="inputfile"
                id="inputfile" />
            <pre id="output"></pre>
        </div>
    )
};