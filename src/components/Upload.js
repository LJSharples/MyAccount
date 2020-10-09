import React, { useState, useRef} from 'react';
import { Storage } from "aws-amplify";

function Uploader(props) {
   const file = useRef({});
   
   function readContent(file) {
      return new Promise((accept, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => accept({
            name: file.name,
            type: file.type,
            content: reader.result
         });
         reader.onerror = () => reject();
      });
   }
  
   function upload(file) { // fake upload
        Storage.put(file.name, file, {
            contentType:file.type,
            level: 'private'
        })
        .then(
            result => {
                console.log(result)
                props.fileUploadKey(result.key);
            })
        .catch(err => console.log(err));
   }
   
   function onSubmit(event) {
      event.preventDefault();
      
      const filesAsArray = [...file.current.files];
      const fileInfo = Promise.all(filesAsArray.map(upload))
          .then(console.log);
      
      return false;
   }
   
   return (
     <div>
        <form onSubmit={onSubmit}>
            <input ref={file} type="file" multiple={true} />
            <input type="submit" value="Confirm Files" />
        </form>
     </div>
   );
}
export default Uploader