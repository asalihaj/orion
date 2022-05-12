import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Button, Card, Grid, Icon, Image, Input } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
import { IUserProfile } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";

const JobSeekerProfile:React.FC<{userProfile: IUserProfile}> = ({userProfile}) => {
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

    const [firstName, setFirstname] = useState();
    const [lastName, setLastname] = useState();
    const [gender, setGender] = useState();
    const [birthday, setBirthday] = useState();
    const [bio, setBio] = useState();
    
    const isCurrentUser = () => {
        if (user) {
            return user.username === userProfile.username;
        } else {
            return false;
        }
    }

    useEffect(() => {
        setFirstname(userProfile.profile?.firstName);
        setLastname(userProfile.profile?.lastName);
        setGender(userProfile.profile?.gender);
        setBirthday(userProfile.profile?.birthday);
        setBio(userProfile.profile?.bio);
    }, [
        userProfile.profile?.firstName,
        userProfile.profile?.lastName,
        userProfile.profile?.gender,
        userProfile.profile?.birthday
    ]);

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
                        {firstName + ' ' + lastName}
                    </Card.Header>
                    <Card.Meta>{gender === 'm' ? 'Male' : 'Female'}</Card.Meta>
                    <Card.Description>{format(birthday, 'dd/MM/yyyy')}</Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column>
            <ReactQuill 
                    theme="bubble"
                    readOnly={true}
                    value={bio || ''}
                />
            </Grid.Column>
        </Grid>
    );
}

export default observer(JobSeekerProfile);