import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import OfferDashboard from "../../features/offers/dashboard/OfferDashboard";
import Login from "../../features/user/login/Login";
import Register from "../../features/user/register/Register";
import ModalContainer from "../common/modals/ModalContainer";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import NotFound from "./NotFound";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { appLoaded, token, setAppLoaded } = rootStore.commonStore;
  const { getUser, user } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if(!appLoaded) return <LoadingComponent content='Loading app...'/>

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
              <Route path='/offers'  component={withRouter(OfferDashboard)} />
              {user && <Route path='/saved'  component={withRouter(OfferDashboard)} />}              
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
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