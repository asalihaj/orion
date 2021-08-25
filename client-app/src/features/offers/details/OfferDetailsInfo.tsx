import React, { Fragment } from 'react';
import { Container, Grid, Header, Item, List } from 'semantic-ui-react';
import { IOffer } from '../../../app/models/offer';

const OfferDetailedInfo: React.FC<{offer: IOffer}> = ({offer}) => {
    return (
        <Item>
            <Item.Content>
                <Grid 
                columns={2}
                relaxed='very'
                style={{
                    borderBottom: '1px solid gray',
                    marginBottom: '2rem'
                }}>
                    <Grid.Column width={8}>
                        <Header as='h5'>Job</Header>
                        <List as='ul'>
                            <List.Item as='li'>10 applicants</List.Item>
                            <List.Item as='li'>Full-time</List.Item>
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
                    <Header as='h2'>Description</Header>
                    <p>
                        {offer.description}
                    </p>
            </Item.Content>
        </Item>
    )
}

export default OfferDetailedInfo;