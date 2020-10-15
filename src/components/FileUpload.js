import React from "react";
import { Storage } from "aws-amplify";
import Dropzone from "react-dropzone";

class FileUpload extends React.Component {
    state = {
        fileNames: [],
        files: []
    }

    async onUpload(files){
        files.map((file) => {
            
            this.setState(prevState => ({
                fileNames: [...prevState.fileNames, file.name]
            }))
            this.uploadToS3(file);
        })
    }

    uploadToS3(file){
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
    }

    render(){
        return (
            <Dropzone onDrop={acceptedFiles => this.onUpload(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section className="appearance-none block w-full bg-gray-200">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <div> 
                            {this.state.fileNames.map(function(d, idx){
                                return (<li key={idx}>{d}</li>)
                            })}
                        </div>
                    </section>
                )}
            </Dropzone>
        )
    }
}

export default FileUpload