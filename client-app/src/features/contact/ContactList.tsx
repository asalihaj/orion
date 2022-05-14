import { observer } from "mobx-react-lite";
import { memo, useContext, useEffect } from "react";
import { Container, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ContactListItem from "./ContactListItem";

const ContactList =memo(() => {
    const rootStore = useContext(RootStoreContext);
    const { getContacts } = rootStore.contactStore;
    const contacts = getContacts();

    useEffect(() => {

    }, [getContacts]);
    
    return(
        <Segment className="segment-list-style">
            {contacts.map(contact => <ContactListItem key={contact.id} contact={contact} />)}
        </Segment>
    );
})

export default ContactList;