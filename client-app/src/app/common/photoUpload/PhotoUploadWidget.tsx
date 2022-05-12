import { useContext, useState } from "react";
import { Button, Divider, Grid, Header, Icon, Image, Message } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoUploadDropzone from "./PhotoUploadDropzone";
import './styles.css';
import { RootStoreContext } from "../../stores/rootStore";

interface IProps {
    uploadPhoto: (file: Blob) => void;
    deletePhoto: () => void;
}

const PhotoUploadWidget: React.FC<IProps>= ({ uploadPhoto, deletePhoto }) => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    const [files, setFiles] = useState<any[]>([]);
    const [image, setImage] = useState<Blob | null>(null);
      
    return(
        <Grid className="grid-modal">
            <Grid.Row className="image-row">
                {files.length == 0 && <PhotoUploadDropzone setFiles={setFiles} />}
                {files.length > 0 && 
                <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />}
            </Grid.Row>
            <Grid.Row className="button-row">
                <Grid.Column className="button-column info-column">
                    <Icon name='info' disabled circular />
                    <Header className="info-text" as='h3' color='grey'>Scroll to zoom</Header>
                    
                </Grid.Column>
                <Grid.Column className="button-column">
                    
                    <Button primary floated="right" onClick={() => uploadPhoto(image)}>Save</Button>
                    {user && user.photo && 
                    <Button color="red" floated="right" onClick={() => deletePhoto()}>Delete current</Button>}
                    {files.length > 0 &&
                    <Button inverted color='red' floated="right" onClick={() => setFiles([])}>Clear</Button>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default PhotoUploadWidget;