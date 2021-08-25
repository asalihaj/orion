import React, { useContext, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import OfferList from './OfferList';
import { observer } from 'mobx-react-lite';
import OfferDetails from '../details/OfferDetails';
import { RootStoreContext } from '../../../app/stores/rootStore';

const OfferDashboard = () => {
    const rootStore = useContext(RootStoreContext);
    const { offer, loadOffers, loadSavedOffers } = rootStore.offerStore;

    useEffect(() => {
        loadOffers();
        loadSavedOffers();
    }, [loadOffers, loadSavedOffers]);


    return (
        <Container>
            <Grid>
                <Grid.Column width={7}>
                    <OfferList />
                </Grid.Column>
                <Grid.Column width={9}>
                    { offer && 
                    <OfferDetails />}
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default observer(OfferDashboard);