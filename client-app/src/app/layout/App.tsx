import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect } from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import OfferDashboard from "../../features/offers/dashboard/OfferDashboard";
import Login from "../../features/user/login/Login";
import OfferForm from "../../features/offers/form/OfferForm";
import Register from "../../features/user/register/Register";
import ModalContainer from "../common/modals/ModalContainer";
import { RootStoreContext } from "../stores/rootStore";
import NotFound from "./NotFound";
import UserProfile from "../../features/user/profile/UserProfile";
import ProfileSettings from "../../features/user/profile/settings/ProfileSettings";
import ResumeDashboard from "../../features/resume/ResumeDashboard";
import ContactUs from "../../features/contact/ContactUs";
import ContactsDashboard from "../../features/contact/ContactsDashboard";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { token, setAppLoaded } = rootStore.commonStore;
  const { getUser, user } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <NavBar />
      <Route exact path='/' component={HomePage}/>

      <Route path={'/(.+)'} 
      render={() => (
        <Fragment>
          <Container style={{ padding: '0' }}>
            <Switch>
              <Route 
                key={location.key}
                path={['/offers/create', '/offers/:id/edit']}
                component={withRouter(OfferForm)} />
              <Route path='/offers'  component={withRouter(OfferDashboard)} />
              {user && user.role === 'JobSeeker' && <Route path='/saved'  component={withRouter(OfferDashboard)} />}              
              <Route path='/login' component={Login} />
              <Route path='/contact' component={ContactUs} />
              <Route path='/register' component={Register} />
              {user && user.role === 'Company' && <Route exact path='/resumes' component={withRouter(ResumeDashboard)}/>}
              {user && user.role === 'Admin' && <Route exact path='/contacts' component={withRouter(ContactsDashboard)}/>}
              {user && user.role === 'Admin' && <Route exact path='/reports' component={withRouter(ContactsDashboard)}/>}
              <Route exact path='/:username/profile' component={UserProfile} />
              {user && <Route path={`/${user.username}/edit`} component={withRouter(ProfileSettings)} />}
              <Route component={NotFound}/>
            </Switch>
          </Container>
        </Fragment>
      )} 
      />
    </Fragment>
  );
}

export default withRouter(observer(App));