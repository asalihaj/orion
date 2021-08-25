import { useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { RootStoreContext } from '../../../app/stores/rootStore';
import { history } from "../../..";
import { IOffer } from "../../../app/models/offer";

const OfferOptions: React.FC<{ offer: IOffer }> = ({offer}) => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    const { deleteOffer } = rootStore.offerStore;
    return (
        <Dropdown
        style={{
            position: 'absolute',
            right: '0',
            top: '-0.6rem'
        }}
        key={offer.id}
        >
            {user && offer.publisher.username === user.username ? (
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
                        <Dropdown.Item 
                        text='Save'
                        onClick={() => user ? console.log("TODO: Add save function") : history.push('/login')}
                        />
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