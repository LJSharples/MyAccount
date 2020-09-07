import React from "react";
import { Storage } from "aws-amplify";
import Dropzone from "react-dropzone";

class FileUpload extends React.Component {
    async onUpload(files){
        files.map((file) => {
            Storage.put(file.name, file, {
                level: 'private',
                contentType: file.type
            })
            .then(
                result => {
                    console.log(result)
                    this.props.fileUploadKey(result.key)
                })
            .catch(err => console.log(err));
        })
    }

    render(){
        return (
            <Dropzone onDrop={acceptedFiles => this.onUpload(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
        )
    }
}

export default FileUpload