import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Grid, Header, Image, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { history } from "../..";
import './style.css';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    useEffect(() => {
        if (user) {
            history.push('/offers');
        }
    }, [user]);

    return (
        
        <Container>
        <Grid
         style={{
             marginTop: '12rem'
             }}>
            <Grid.Row columns={2}>
                <Grid.Column width={4}>
                    <Header className='font-blue font-lg' size='huge'>Find the perfect job</Header>
                    <p className='font-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <Button primary size='huge' as={Link} to='/offers'>Search Jobs</Button>
                </Grid.Column>
                <Grid.Column floated='right' width={8}>
                    <Image size='huge' src='/assets/homepage-vector-01.png' />
                </Grid.Column>
            </Grid.Row>
            <Divider hidden />
            <Grid.Row stretched columns={2}>
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
        </Container>
    )
}

export default HomePage;