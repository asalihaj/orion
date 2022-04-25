import { useContext, useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { RootStoreContext } from '../../../app/stores/rootStore';
import { history } from "../../..";
import { IOffer } from "../../../app/models/offer";
import { toast } from "react-toastify";

const OfferOptions: React.FC<{ offer: IOffer }> = ({offer}) => {
    const rootStore = useContext(RootStoreContext);
    const { user, getUser } = rootStore.userStore;
    const { save, remove } = rootStore.jobSeekerStore;
    const { deleteOffer } = rootStore.offerStore;

    useEffect(() => {
        
    })

    const saveOffer = (id: string) => {
        return save(id);
    }

    const removeOffer = (id: string) => {
        return remove(id);
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
                        onClick={() => history.push(`/${offer.id}/edit`)}
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
                        onClick={() => user ? console.log("TODO: Add report function") : history.push('/login')}
                        />
                    </Dropdown.Menu>
                )
            }
           
         </Dropdown>
    )
}

export default OfferOptions;