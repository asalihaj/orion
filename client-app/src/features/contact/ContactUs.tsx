import { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { Button, Checkbox, Container, Form, Grid, Header, Segment, TextArea } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { TextAreaInput } from "../../app/common/form/TextAreaInput";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";

const validate = combineValidators({
  email: isRequired('Email'),
  title: isRequired('Title'),
  description: isRequired('Message')
});

const ContactUs = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const handleFormSubmit = () => {
    
  }

  return(
  <Container style={{ marginTop: '3rem' }}>
    <Grid centered>
      <Grid.Column width={8}>
        <Segment>
          <FinalForm
            onSubmit={handleFormSubmit}
            validate={validate}
            render={({
              handleSubmit, submitting, submitError, dirtySinceLastSubmit
            }) => (
              <Form size='big' onSubmit={handleSubmit} error>
                <Header
                  as='h2'
                  content='Contact us'
                  color='blue'
                  textAlign='left' />
                  {!user &&
                  <Field
                    name='email'
                    component={TextInput}
                    placeholder='Email' />}
                <Field
                  name='title'
                  component={TextInput}
                  placeholder='Title' />
                <Field
                  name='description'
                  component={TextAreaInput}
                  placeholder='Message' />
                <Button
                  loading={submitting}
                  primary
                  content='Submit'
                  size='big'
                  fluid
                  circular />
                {submitError && !dirtySinceLastSubmit && (
                  <ErrorMessage
                    error={submitError}
                    text={submitError} />
                )}
              </Form>

            )} />
        </Segment>
      </Grid.Column>
    </Grid>
  </Container>
  );
}

export default ContactUs;
