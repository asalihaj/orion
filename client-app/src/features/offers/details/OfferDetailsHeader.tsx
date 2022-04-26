import { observer } from 'mobx-react-lite';
import { Fragment, useContext } from 'react';
import { Button, Item } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import './styles.css';
import { history } from '../../..';
import { toast } from 'react-toastify';
import { IResumeFormValues } from '../../../app/models/resume';


const OfferDetailedHeader = () => {
    const rootStore = useContext(RootStoreContext);
    const { offer } = rootStore.offerStore;
    const { openModal } = rootStore.modalStore;
    const { user, getUser } = rootStore.userStore;
    const { save, remove } = rootStore.jobSeekerStore;
    const { createResume } = rootStore.resumeStore;

    const apply = (cv: string) => {
        const resume: IResumeFormValues = {
            offerId: offer.id,
            jobSeekerId: user.id,
            cv: cv
        }
        createResume(resume)
        .then(() => {
            toast.success("Resume sent successfully");
        })
        .catch(error => {
            toast.error(error.data.errors);
        }) ;
    }

    const saveOffer = (id: string) => {
        return save(id);
    }

    const removeOffer = (id: string) => {
        return remove(id);
    }
    
    return (     
        <Item>
            <Item.Image src='/assets/fb.png' size='tiny'/>
            <Item.Content>
                <Item.Header>{offer.title}</Item.Header>
                <Item.Meta>{offer.publisher.name}</Item.Meta>
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
                        () => {user ? (
                            apply('MY CV')) : 
                            history.push('/login')                            
                        }} 
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
                            removeOffer(offer.id).then(() => {
                                toast.success("Offer removed");
                            }).then(() => getUser())
                            .catch(error => toast.error(error));
                        } else {
                            saveOffer(offer.id).then(() => {
                                toast.success("Offer saved");
                            }).then(() => getUser())
                            .catch(error => toast.error(error));
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