import { useContext } from "react";
import { Container, Segment, Tab } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import CompanySettings from "./CompanySettings";
import JobSeekerSettings from "./JobSeekerSettings";
import UserSettings from "./UserSettings";


const ProfileSettings: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, loadingInitial } =  rootStore.userStore;
    const panes = [
        { menuItem: 'Account', render: () => <Tab.Pane>
            <UserSettings user={user} />
        </Tab.Pane> }
    ]

    if(user.role !== 'Admin') {
        panes.push({ menuItem: 'Profile', render: () => <Tab.Pane>
        {user.role === 'Company' ? <CompanySettings profile={user.profile} /> : user.role === 'JobSeeker' ? <JobSeekerSettings profile={user.profile} /> : null}
    </Tab.Pane> })

    if (loadingInitial)
        <LoadingComponent content="Loading user"/>
    
    }
    return(
        <Container style={{ marginTop: '5rem' }}>
            <Tab  menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
        </Container>
    );
}

export default ProfileSettings;