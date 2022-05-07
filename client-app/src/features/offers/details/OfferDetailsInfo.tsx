import { format } from 'date-fns';
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
                        <Header as='h5'>Job details</Header>
                        <List>
                            <List.Item><b>Schedule:</b> {offer.schedule}</List.Item>
                            <List.Item><b>Salary:</b> {offer.salary}</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Header as='h5'>Company</Header>
                        <List>
                            <List.Item><b>Category:</b> {offer.category}</List.Item>
                            <List.Item><b>Ends in:</b> {format(offer.expDate!, 'dd/MM/yyyy HH:mm')}</List.Item>
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