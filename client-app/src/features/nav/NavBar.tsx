import React, { Fragment, useContext, useState } from "react";
import { Menu, Container, Button, Dropdown, Image, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import './navbar.css';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout} = rootStore.userStore;

  return (
    <Menu
    inverted
    borderless
    >
      <Container style={{ padding: '0' }}>
        <Menu.Item className="item-padding" >
          <Header className="nav-item-color">
          <Image className="logo" size='tiny' src='/assets/logo.png' />
            <Header.Content>
              ORION
              <Header.Subheader className="nav-description">CONNECT TO OPPORTUNITY</Header.Subheader>
            </Header.Content>
          </Header>
        </Menu.Item>
        <Menu.Item
        exact 
        as={NavLink} 
        to="/offers">
          <Header className='nav-item-weight nav-item-color' as='h4'>
            OFFERS
          </Header>
        </Menu.Item>
        {user && user.role === 'JobSeeker' && <Menu.Item as={NavLink} to="/saved">
          <Header className='nav-item-weight nav-item-color' as='h4'>
            SAVED
          </Header>
        </Menu.Item>}
        {user ? (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"

              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.username}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/${user.username}/edit`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout}  text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        ) : (
          <Menu.Menu position='right'>
            <Menu.Item
            className='nav-item'
            as={NavLink}
            to='/register'
            >
              Register
            </Menu.Item>
            <Menu.Item>
              <Button
                color='twitter'
                name="Login" 
                as={Link}
                to="/login"
                style={{ marginLeft: "8px" }}
                >
                  Login
              </Button>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
 