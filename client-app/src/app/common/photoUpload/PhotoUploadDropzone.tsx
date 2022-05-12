import {useCallback, useContext, useRef, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button, Divider, Header, Icon, Segment } from 'semantic-ui-react';

interface IProps {
    setFiles: (files: object[]) => void;
}


const PhotoUploadDropzone: React.FC<IProps> = ({ setFiles }) => {
    const onDrop = useCallback(acceptedFiles => {
        const ext = acceptedFiles[0].path.split('.').pop()
        const allowedExts = ['png', 'jpg', 'jpeg']
        if (!allowedExts.includes(ext)) {
            return;
        }
        setFiles(acceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return(
            <div {...getRootProps()} className='upload-container' >
                <input {...getInputProps()}  />
                {
                    isDragActive ?
                    (
                        <Segment className='upload-boder-line upload-border-active' basic textAlign='center'>
                            <Icon name='cloud upload' size='huge' />
                            <Header as='h2'>
                                Drag &amp; Drop to Upload 
                                <Divider horizontal>Or</Divider>
                                <Button color='twitter' size='tiny' disabled>Upload</Button> 
                                <div>(.png .jpg .jpeg)</div>
                            </Header>
                        </Segment>
                        ) :
                    (
                        <Segment className='upload-boder-line' basic textAlign='center'>
                            <Icon name='cloud upload' size='huge' disabled />
                            <Header as='h2' color='grey'>
                                Drag &amp; Drop to Upload
                                <Divider horizontal>Or</Divider>
                                <Button color='twitter' size='tiny'>Upload</Button> 
                                <div>(.png .jpg .jpeg)</div>
                            </Header>
                        </Segment>
                    )
                }
            </div>
    );
}

export default PhotoUploadDropzone;