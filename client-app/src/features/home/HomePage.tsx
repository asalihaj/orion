import { Link } from "react-router-dom";
import { Button, Container, Divider, Grid, Header, Image, Segment } from "semantic-ui-react";
import './style.css';

const HomePage = () => {
    return (
        <Grid stackable 
         style={{
             marginTop: '12rem'
             }}>
            <Grid.Row centered>
                <Grid.Column floated='right' width={4}>
                        <Header className='font-blue font-lg' size='huge'>Find the perfect job</Header>
                        <p className='font-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Delectus, asperiores consequuntur quibusdam recusandae commodi</p>
                    <Button primary size='huge' as={Link} to='/offers'>Search Jobs</Button>
                    
                </Grid.Column>
                <Grid.Column floated='right' width={8}>
                    <Image size='huge' src='/assets/homepage-vector-01.png' />
                </Grid.Column>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row centered style={{ backgroundColor: '#f2f2f2' }}>
               <Grid.Column 
                width={8} 
                textAlign='center' 
                verticalAlign='middle'>
                    <Header textAlign='center'  size='huge'>
                        Find remote jobs all around the world
                    </Header>
               </Grid.Column>
               <Grid.Column width={8}>
                   <Image size='large' src='/assets/homepage-vector-02.jpg'/>
               </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default HomePage;