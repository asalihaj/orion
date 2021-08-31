import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react';
import { Button, Image, Item } from 'semantic-ui-react';
import { IOffer } from '../../../app/models/offer';
import { RootStoreContext } from '../../../app/stores/rootStore';
import './styles.css';
import { history } from '../../..';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const OfferDetailedHeader = () => {
    const rootStore = useContext(RootStoreContext);
    const { offer } = rootStore.offerStore;
    const { openModal } = rootStore.modalStore;
    const { user } = rootStore.userStore;
    return (     
        <Item>
            <Item.Image src='/assets/fb.png' size='tiny'/>
            <Item.Content>
                <Item.Header>{offer.title}</Item.Header>
                <Item.Meta>{offer.publisher.name}</Item.Meta>
                <Item.Meta>
                    {offer.location}
                </Item.Meta>
                
                <Item.Extra>
                    Posted 2 days ago
                </Item.Extra>
                <Fragment>
                    <Button 
                    color='blue'
                    onClick={
                        () => {
                            user ?
                            openModal(<div></div>)
                            :
                            history.push('/login')
                        }} 
                    style={{ marginTop: '3rem', marginRight: '0.7rem'}}
                    size='medium'
                    >
                        Apply
                    </Button>
                    <Button 
                        style={{ marginTop: '3rem'}}
                        size='medium'
                        color='blue'
                        inverted
                        onClick={
                            () => {
                                user ?
                                toast.success("Offer saved")
                                :
                                history.push('/login')
                            }} 
                    >Save</Button>{' '}
                </Fragment>     
            </Item.Content>
        </Item>
    )
}

export default observer(OfferDetailedHeader);