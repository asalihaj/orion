import { Container, Grid, Message, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { useContext } from "react";

const FormContainer = ({form, message = null}) => {
    return (
        <Container style={{ marginTop: '20rem' }}>
            <Grid centered>
                <Grid.Column textAlign='center' width={6}>
                    <Segment padded>
                        {form}
                    </Segment>
                    {message}
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default FormContainer;