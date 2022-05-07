import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import OfferListItem from './OfferListItem';
import { Card, Container, Divider, Header, Icon, Item, Message, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

const OfferList = () => {
    const rootStore = useContext(RootStoreContext);
    const url = window.location.pathname;
    const { getOffers } = rootStore.offerStore;
    const { user } = rootStore.userStore;
    const offers = url === '/saved' ? user.profile.saved : getOffers();

    useEffect(() => {
        getOffers();
    }, [getOffers]);
    
    return (
        <Item.Group>
            { url === '/offers' ? (offers.map(offer => (
                <OfferListItem key={offer.id} offer={offer} publisher={offer.publisher} />
            ))) :
            (
                (offers.length !== 0 && 
                offers.map(offer => (
                    <OfferListItem key={offer.id} offer={offer} publisher={offer.publisher} />
                ))) || <Message warning icon='content' header="You haven't saved any offers yet!" content="Once saved, offers will be displayed here." />
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