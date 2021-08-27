import { Fragment, useContext } from 'react';
import { Grid, Header, Item, List } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';

const OfferDetailedInfo = () => {
    const rootStore = useContext(RootStoreContext);
    const { offer } = rootStore.offerStore;
    return (
        <Item>
            <Item.Content>
                <Grid 
                columns={2}
                style={{
                    borderBottom: '1px solid gray',
                    marginBottom: '2rem'
                }}>
                    <Grid.Column width={8}>
                        <Header as='h5'>Job</Header>
                        <List as='ul'>
                            <List.Item as='li'>{offer.applicants.length} applicants</List.Item>
                            <List.Item as='li'>{offer.schedule}</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Header as='h5'>Company</Header>
                        <List as='ul'>
                            <List.Item as='li'>100-150 employees</List.Item>
                            <List.Item as='li'>Information Technology</List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
                <div className='offer-description'>
                    <Header as='h2'>Description</Header>
                    <p>
                        {offer.description}
                    </p>
                </div>
            </Item.Content>
        </Item>
    )
}

export default OfferDetailedInfo;