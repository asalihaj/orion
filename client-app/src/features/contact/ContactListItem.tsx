import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Item, Image, Message, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import './styles.css';

interface IProps {
    contact: any;
}

const ContactListItem: React.FC<IProps> = ({ contact }) => {
    const rootStore = useContext(RootStoreContext);
    const { loadProfile, returnProfile, loadingProfile } = rootStore.userStore;
    const [user, setUser] = useState(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (contact.username) {
            loadProfile(contact.username)
                .then(() => setUser(returnProfile()))
                .catch(error => console.log(error))
        }
    }, [contact.username, loadProfile, setUser, returnProfile])

    const formatDate = () => {
        let date = new Date(contact.dateCreated);
        let currentDate = new Date();
        if (date.getFullYear() < currentDate.getFullYear())
            return format(new Date(contact.dateCreated), 'dd/MM/yyyy');
        
        return format(new Date(contact.dateCreated), 'd MMM yyyy hh:MM');
    }

    const imageBorder = {
        borderRadius: '50% !important',
        width: '70px !important',
        height: '70px !important'
    }

    return(
        <Segment>
            <Item.Group>
                <Item>
                <Image className="image-border" size='tiny' src={user && user.photo ? user.photo : '/assets/user.png'} />
                <Item.Content>
                    <Item.Header>Subject: {contact.title}</Item.Header>
                    <Item.Meta></Item.Meta>
                    <Item.Description>
                        <Message onClick={() => setActive(!active)}>
                            <Message.Header>{user ? '@' + user.username : contact.email} {' '} <span className="contact-time">{formatDate()}</span></Message.Header>
                            <Message.Content className={active ? "" : "message-text"}>
                            {contact.description}
                            </Message.Content>
                        </Message>
                    </Item.Description>
                </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    );
}

export default observer(ContactListItem);