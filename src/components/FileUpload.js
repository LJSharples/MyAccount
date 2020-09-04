import React from "react";
import { Storage } from "aws-amplify";

class FileUpload extends React.Component {
    async onUpload(e){
        const file = e.target.files[0];
        const fileName = file.name;
        await Storage.put(fileName, file, {
            level: 'private',
            contentType: file.type
        })
        .then(
            result => {
                console.log(result)
                this.props.fileUploadKey(result.key)
            })
        .catch(err => console.log(err));
    }

    render(){
        return (
            <input type="file" onChange={(evt) => this.onUpload(evt)}/>
        )
    }
}

export default FileUpload