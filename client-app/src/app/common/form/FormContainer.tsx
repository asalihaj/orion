import { Container, Grid, Segment } from "semantic-ui-react";

const FormContainer = ({form, header = null, footer = null}) => {
    return (
        <Container style={{ marginTop: '7rem' }}>
            <Grid centered>
                <Grid.Column textAlign='center' width={6}>
                    {header}
                    <Segment padded clearing>
                        {form}
                    </Segment>
                    {footer}
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default FormContainer;