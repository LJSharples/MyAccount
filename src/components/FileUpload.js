import React from "react";
import { Storage } from "aws-amplify";

class FileUpload extends React.Component {
    onUpload(e){
        const file = e.target.files[0];
        const fileName = '';
        Storage.put(fileName, file, {
            level: 'private',
            contentType: 'text/plain'
        })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    render(){
        return (
            <input type="file" onChange={(evt) => this.onUpload(evt)}/>
        )
    }
}