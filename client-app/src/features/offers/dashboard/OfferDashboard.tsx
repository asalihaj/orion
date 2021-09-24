import React, { useContext, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import OfferList from './OfferList';
import { observer } from 'mobx-react-lite';
import OfferDetails from '../details/OfferDetails';
import { RootStoreContext } from '../../../app/stores/rootStore';

const OfferDashboard = () => {
    const rootStore = useContext(RootStoreContext);
    const { offer, loadOffers } = rootStore.offerStore;
    const { user } = rootStore.userStore;

    useEffect(() => {
        loadOffers();
    }, [loadOffers, user]);


    return (
            <Grid style={{ marginTop: '5rem' }}>
                <Grid.Column width={7}>
                    <OfferList />
                </Grid.Column>
                <Grid.Column width={9}>
                    { offer && 
                    <OfferDetails />}
                </Grid.Column>
            </Grid>
    )
}

export default observer(OfferDashboard);