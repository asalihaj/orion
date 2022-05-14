import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Card, Image, Button, Grid, GridColumn, Header, Icon } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
import { IUserProfile } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";

const CompanyProfile:React.FC<{userProfile: IUserProfile}> = ({userProfile}) => {
    const rootStore = useContext(RootStoreContext);
    const { user, uploadPhoto, deletePhoto } = rootStore.userStore;
    const { openModal, closeModal } = rootStore.modalStore;


    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => closeModal()).finally(() => window.location.reload());
    }

    const handleDeleteImage = () => {
        if (user && user.username === userProfile.username) {
            deletePhoto(user.id).then(() => closeModal()).finally(() => window.location.reload());
        }
    }

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        setName(userProfile.profile?.name);
        setLocation(userProfile.profile?.location);
        setDescription(userProfile.profile?.description);
    }, [
        userProfile.profile?.name,
        userProfile.profile?.location,
        userProfile.profile?.description
    ]);

    const isCurrentUser = () => {
        if (user) {
            return user.username === userProfile.username;
        } else {
            return false;
        }
    }

    const paddingLeft = {
        paddingLeft: '2.4rem'
    }

    return(
        <Grid columns={1}>
            <Grid.Column style ={{ marginTop: '1rem' }}>
                <Card fluid>
                    <div className="profile-cover"> 
                    </div>
                    <Card.Content className='image-content'>
                    <Image 
                        className={isCurrentUser() ? "profile-image" : ""}
                        src={userProfile.photo || '/assets/user.png'} 
                        size="small" 
                        bordered 
                        circular 
                        onClick={() => {
                            if (isCurrentUser())
                                openModal(<PhotoUploadWidget uploadPhoto={handleUploadImage} deletePhoto={handleDeleteImage} />)
                            }} />
                            <Icon 
                            name='edit' 
                            size='big' 
                            disabled 
                            className="image-edit-icon" />
                    </Card.Content>
                    <Card.Content style={paddingLeft}>
                    <Card.Header>
                        {name}
                    </Card.Header>
                    <Card.Meta>{location}</Card.Meta>
                    <Card.Description>{}</Card.Description>
                    </Card.Content>
                    <Card.Content style={paddingLeft}>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column>
                <ReactQuill 
                    theme="bubble"
                    readOnly={true}
                    value={description || ''}
                />
            </Grid.Column>
        </Grid>
    );
}

export default observer(CompanyProfile);