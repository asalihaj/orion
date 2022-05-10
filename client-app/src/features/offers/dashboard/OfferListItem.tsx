import React, { useContext } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { IOffer, IPublisher } from '../../../app/models/offer';
import './styles.css';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OfferOptions from './OfferOptions';
import { Link } from 'react-router-dom';

const OfferListItem: React.FC<{ offer: IOffer, publisher: IPublisher }> = ({ offer, publisher }) => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    const { loadOffer } = rootStore.offerStore;

    return (
        <Item 
        className='offer'
         onClick={() => loadOffer(offer.id)}
         style={{ border: '1px solid black !important'}}
        >
            <Item.Image size='tiny' src='/assets/fb.png' />
            <Item.Content>
                {user &&
                <Item.Extra >
                    <OfferOptions offer={offer} />
                </Item.Extra>}
                <Item.Header>{offer.title}</Item.Header>
                <div className='company-info'>
                    <Item.Meta as={Link} to={`/${publisher.username}/profile`}>
                        {publisher.name}
                    </Item.Meta>
                    <Item.Meta>
                        {offer.location}
                    </Item.Meta>
                </div>
                <Item.Extra>
                    <div className='company-info row'>
                        <Label>{format(offer.expDate!, 'dd/MM/yyyy')}</Label>
                        <Item.Description>{offer.applicants} {offer.applicants != 1 ? 'applicants' : 'applicant'}</Item.Description>
                    </div>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default OfferListItem;