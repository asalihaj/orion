import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Card, Container, Item, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OfferDetailedHeader from './OfferDetailsHeader';
import OfferDetailedInfo from './OfferDetailsInfo';

interface DetailParams {
    id: string
}

const OfferDetails: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { offer } = rootStore.offerStore;
    return (
        <Segment>
            <Item.Group>
                <OfferDetailedHeader offer={offer}/>
                <OfferDetailedInfo offer={offer}/>
            </Item.Group>
        </Segment>
    )
}

export default observer(OfferDetails);