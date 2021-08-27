import React, { Fragment, useContext } from 'react';
import { Button, Divider, Grid, Item, Label, Image, Header, Segment, Container } from 'semantic-ui-react';
import { IOffer, IPublisher } from '../../../app/models/offer';
import './styles.css';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { history } from '../../..';
import OfferOptions from './OfferOptions';
import { Link } from 'react-router-dom';

const OfferListItem: React.FC<{ offer: IOffer, publisher: IPublisher }> = ({ offer, publisher }) => {
    const rootStore = useContext(RootStoreContext);
    const { loadOffer } = rootStore.offerStore;

    const offerStyle = {
        border: '1px solid black !important'
    }

    return (
        <Item 
        className='offer'
         onClick={() => loadOffer(offer.id)}
         style={{ border: '1px solid black !important'}}
        >
            <Item.Image size='tiny' src='/assets/fb.png' />
            <Item.Content>
                <Item.Extra >
                    <OfferOptions offer={offer} />
                </Item.Extra>
                <Item.Header>{offer.title}</Item.Header>
                <div className='company-info'>
                    <Item.Meta as={Link} to='#'>
                        {publisher.name}
                    </Item.Meta>
                    <Item.Meta>
                        {offer.location}
                    </Item.Meta>
                </div>
                <Item.Extra>
                    <div className='company-info row'>
                        <Label>{format(offer.expDate!, 'dd/MM/yyyy')}</Label>
                        <Item.Description>{offer.applicants.length} applicants</Item.Description>
                    </div>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default OfferListItem;