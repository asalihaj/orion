import React from "react";
import { Container, Grid, GridColumn, Image } from "semantic-ui-react";

const UserProfile = () => {
  return (
    <Container>
      <Grid columns={3}>
        <Grid.Column>
          <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe doloremque veniam aut facere tempora quam, reiciendis molestias labore voluptates odio nulla voluptate pariatur quas mollitia laborum nam fuga porro quia.</p>
        </Grid.Column>
        <GridColumn>

        </GridColumn>
      </Grid>
    </Container>
  );
};

export default UserProfile;
