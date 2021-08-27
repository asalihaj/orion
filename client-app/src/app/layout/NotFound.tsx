import { Segment, Button, Header, Icon, Image, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container textAlign='center'>
            <Image size='massive' src='/assets/notfound.png' />
            <Button size='massive' as={Link} to='/' primary>Return to Home page</Button>
        </Container>
        // <Segment placeholder>
        //     <Header icon>
        //         <Icon name='search' />
                
        //     </Header>
        //     <Segment.Inline>
        //     <Image size='huge' src='/assets/notfound.jpg'/>
        //         <Button as={Link} to='/' primary>
        //             Return to Home page
        //         </Button>
        //     </Segment.Inline>
        // </Segment>
    );
};

export default NotFound;