import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import ContactList from "./ContactList";

const ContactsDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadContacts, loadingInitial } = rootStore.contactStore;

    useEffect(() => {
        loadContacts();
    }, [loadContacts])

    if (loadingInitial)
        return <LoadingComponent content='Loading messages' />

    return(
        <div style={{ marginTop: '1.3rem', marginBottom: '1.7rem' }}>
            <ContactList />
        </div>
    );
}

export default observer(ContactsDashboard);