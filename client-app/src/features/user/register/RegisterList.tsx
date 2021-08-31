import { Grid, Segment, Image, Header, Item, Button, Divider } from "semantic-ui-react";
import './styles.css';

const RegisterList = () => {
    return (
        <Segment className='top-space' secondary padded='very'>
            <Grid columns={2}>
                <Grid.Column width={8}>
                    <Item.Group style={{ marginLeft: '5rem' }}>
                    <Item>
                        <Item.Image size='small' src='/assets/company-icon.png' />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header>Register as Company</Item.Header>
                            <Item.Extra>
                                <Button icon='chevron right' labelPosition='right' content='Continue' color='instagram' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Item.Group style={{ marginLeft: '5rem' }}>
                        <Item>
                            <Item.Image size='small' src='/assets/jobseeker-icon.png' />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header>Register as JobSeeker</Item.Header>
                                <Item.Extra>
                                    <Button icon='chevron right' labelPosition='right' content='Continue' color='instagram' />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
            <Divider vertical>OR</Divider>
        </Segment>
    )
}

export default RegisterList;