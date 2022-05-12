import { useContext, useEffect } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import OfferList from './OfferList';
import { observer } from 'mobx-react-lite';
import OfferDetails from '../details/OfferDetails';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const OfferDashboard:React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { offer, loadOffers, loadingInitial } = rootStore.offerStore;

    useEffect(() => {
        loadOffers();
    }, [loadOffers]);

    if (loadingInitial)
        return <LoadingComponent content='Loading offers' />;

    return (
            <Grid style={{ marginTop: '3.7rem' }}>
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