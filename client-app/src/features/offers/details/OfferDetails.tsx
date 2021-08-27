import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Card, Container, Item, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import OfferDetailedHeader from './OfferDetailsHeader';
import OfferDetailedInfo from './OfferDetailsInfo';
import './styles.css';

interface DetailParams {
    id: string
}

const OfferDetails: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { offer } = rootStore.offerStore;
    return (
        <Segment className='sticky'>
            <Item.Group>
                <OfferDetailedHeader />
                <OfferDetailedInfo />
            </Item.Group>
        </Segment>
    )
}

export default observer(OfferDetails);