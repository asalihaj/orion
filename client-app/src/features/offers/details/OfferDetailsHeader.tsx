import { observer } from 'mobx-react-lite';
import { Fragment, useContext } from 'react';
import { Button, Item } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import './styles.css';
import { toast } from 'react-toastify';
import { IResumeFormValues } from '../../../app/models/resume';
import { Link } from 'react-router-dom';
import ResumeUploadWidget from '../../../app/common/resumeUpload/ResumeUploadWidget';


const OfferDetailedHeader = () => {
    const rootStore = useContext(RootStoreContext);
    const { offer } = rootStore.offerStore;
    const { user, getUser } = rootStore.userStore;
    const { save, remove } = rootStore.jobSeekerStore;
    const { createResume } = rootStore.resumeStore;
    const { openModal, closeModal } = rootStore.modalStore;

    const apply = (file: Blob) => {
        const resume: IResumeFormValues = {
            offerId: offer.id,
            jobSeekerId: user.id
        }

        createResume(file, resume)
        .then(() => toast.success("Resume sent!"))
        .catch(e => toast.error(e.data.errors))
        .finally(() => closeModal());
    }

    const saveOffer = () => {
        save(offer.id)
        .then(() => {
            toast.info("Offer saved");
        }).then(() => getUser())
        .catch(error => toast.error(error));
    }

    const removeOffer = () => {
        remove(offer.id)
        .then(() => {
            toast.info("Offer removed");
        }).then(() => getUser())
        .catch(error => toast.error(error));;
    }

    const imageBorder = {
        borderRadius: '50%',
        width: '70px',
        height: '70px'
    }
    
    return (     
        <Item>
            <Item.Image style={imageBorder}  src={offer.publisher.url ? offer.publisher.url : '/assets/fb.png'} size='tiny' circular/>
            <Item.Content>
                <Item.Header>{offer.title}</Item.Header>
                <div></div>
                <Item.Meta as={Link} to={`/${offer.publisher.username}/profile`}>
                    {offer.publisher.name}
                </Item.Meta>
                <Item.Meta>
                    {offer.location}
                </Item.Meta>
                
                <Item.Extra>
                    Posted 2 days ago
                </Item.Extra>
                
                <Fragment>
                    {((user && user.role !== 'Company' 
                        && user.role !== 'Admin') || !user) &&
                    <Button 
                    color='blue'
                    onClick={
                        () => {openModal(<ResumeUploadWidget uploadResume={apply} />)}} 
                    style={{ marginTop: '3rem', marginRight: '0.7rem'}}
                    size='medium'
                    >
                        Apply
                    </Button>
                    }
                    {user && user.role === 'JobSeeker' &&
                    <Button 
                    style={{ marginTop: '3rem'}}
                    size='medium'
                    color='blue'
                    inverted
                    onClick={() => {
                        const saved = user.profile.saved.find(e => e.id === offer.id)
                        if(saved) {
                            removeOffer()
                        } else {
                            saveOffer()
                        }
                    }
                }
                >{user.profile.saved.find(e => e.id === offer.id)? 'Unsave' : 'Save'}</Button>}
                </Fragment>
            </Item.Content>
        </Item>
    )
}

export default observer(OfferDetailedHeader);