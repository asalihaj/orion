import { useContext, useState,  } from "react";
import { Dropdown, Image } from "semantic-ui-react";
import { RootStoreContext } from '../../../app/stores/rootStore';
import { history } from "../../..";
import { IOffer } from "../../../app/models/offer";
import { toast } from "react-toastify";
import ReportForm from "../../report/ReportForm";

const OfferOptions: React.FC<{ offer: IOffer }> = ({offer}) => {
    const rootStore = useContext(RootStoreContext);
    const { user, getUser } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;
    const { save, remove } = rootStore.jobSeekerStore;
    const { deleteOffer } = rootStore.offerStore;

    

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

    return (
        <Dropdown
        style={{
            position: 'absolute',
            right: '0',
            top: '-0.6rem'
        }}
        key={offer.id}
        >
            {user && offer.publisher.id === user.id ? (
                    <Dropdown.Menu>
                        <Dropdown.Item 
                        text='Edit'
                        onClick={() => history.push(`/offers/${offer.id}/edit`)}
                        />
                        <Dropdown.Item 
                        text='Delete' 
                        onClick={() => deleteOffer(offer.id) }
                        />
                    </Dropdown.Menu>
                ) : (
                    <Dropdown.Menu>
                        {user.role === 'JobSeeker' &&  
                            <Dropdown.Item 
                            text= {user.profile.saved.find(e => e.id === offer.id) ? 'Unsave' : 'Save'}
                            onClick={() => {
                                    const saved = user.profile.saved.find(e => e.id === offer.id)
                                    if(saved) {
                                        removeOffer();
                                    } else {
                                        saveOffer();
                                    }
                                }
                            }
                            />
                        }
                        {user.role === 'Admin' &&
                            <Dropdown.Item 
                            text= 'Delete'
                            onClick={() => console.log('Delete')}
                            />
                        }
                       
                        <Dropdown.Item 
                        text='Report' 
                        onClick={() => user ? 
                            openModal(<ReportForm offer={offer} />) : history.push('/login')}
                        />
                    </Dropdown.Menu>
                )
            }
           
         </Dropdown>
    )
}

export default OfferOptions;