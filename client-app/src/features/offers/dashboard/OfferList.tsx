import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import OfferListItem from './OfferListItem';
import { Card, Container, Divider, Item, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { history } from '../../..';
import { IOffer } from '../../../app/models/offer';
import NotFound from '../../../app/layout/NotFound';

const OfferList = () => {
    const rootStore = useContext(RootStoreContext);
    const url = window.location.pathname;
    const { savedOffers, getOffers } = rootStore.offerStore;
    const offers = url === '/saved' ? savedOffers : getOffers();
    
    return (
        <Item.Group>
            { url === '/offers' ? (offers.map(offer => (
                <OfferListItem key={offer.id} offer={offer} publisher={offer.publisher} />
            ))) :
            (
                offers.map(([group, offers]) => (
                    offers.map(offer => (
                        <OfferListItem key={offer.id} offer={offer} publisher={offer.publisher} />
                    ))
                ))
            )
            }
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