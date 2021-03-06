import { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import './styles.css';
import JobSeekerProfile from "./JobSeekerProfile";
import CompanyProfile from "./CompanyProfile";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { history } from "../../..";

interface DetailParams {
  username: string
}

const UserProfile: React.FC<RouteComponentProps<DetailParams>> = ({
  match
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadProfile, loadingProfile } = rootStore.userStore;

  const [profile, setProfile] = useState();
  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  const [photo, setPhoto] = useState();
  
  useEffect(() => {
    
    loadProfile(match.params.username)
    .then((res) => {
      if (res.role === 'Admin') {
        history.push('/offers');
        return;
      }
      setProfile(res.profile);
      setUsername(res.username);
      setRole(res.role);
      setPhoto(res.photo);
    })
  }, [loadProfile, match.params.username]);

  const user = {
    profile: profile,
    role: role,
    username: username,
    photo: photo
  }

  if (loadingProfile)
    return <LoadingComponent content="Loading user's profile" />

  return (
    <Container>
      <Grid columns={1}>
        <Grid.Column style ={{ marginTop: '3rem' }}>
          {role === 'Company' ? <CompanyProfile userProfile={user} /> : <JobSeekerProfile userProfile={user} />}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default observer(UserProfile);
