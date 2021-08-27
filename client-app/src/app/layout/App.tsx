import { group } from "console";
import { observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Card, Container, Item } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import OfferDashboard from "../../features/offers/dashboard/OfferDashboard";
import LoginForm from "../../features/user/LoginForm";
import ModalContainer from "../common/modals/ModalContainer";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import NotFound from "./NotFound";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { appLoaded, token, setAppLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

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
      <Route exact path='/' component={HomePage}/>
      <NavBar />

      <Route path={'/(.+)'} 
      render={() => (
        <Fragment>
             
          <Container style={{ marginTop: '7em', width: 'auto' }}>
            <Switch>
              <Route exact path='/offers'  component={withRouter(OfferDashboard)} />
              <Route exact path='/saved'  component={withRouter(OfferDashboard)} />              
              <Route exact path='/login' component={LoginForm} />
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