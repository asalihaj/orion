import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import OfferListItem from './OfferListItem';
import { Card, Container, Divider, Item, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IOffer } from '../../../app/models/offer';

const OfferList = () => {
    const rootStore = useContext(RootStoreContext);
    const url = window.location.pathname;
    const { savedOffers, offersByDate, getOffers } = rootStore.offerStore;
    const offers = getOffers(); //= url === '/saved' ? savedOffers : offersByDate;
    
    return (
        <Item.Group>
            {offers.map(offer => (
                <OfferListItem key={offer.id} offer={offer} publisher={offer.publisher} />
            ))}
            {/* {offers.map(([group, offers]) => (
                    <Segment>
                    {offers.map(offer => (
                        
                        <OfferListItem key={offer.id} offer={offer} publisher={offer.publisher} />
                        
                    ))}
                    </Segment>
            ))} */}
        </Item.Group>
    );
};

export default observer(OfferList);