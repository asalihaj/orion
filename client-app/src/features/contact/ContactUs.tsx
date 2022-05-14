import { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import { v4 as uuid } from 'uuid';
import { Button, Container, Form, Grid, Header, Segment } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { TextAreaInput } from "../../app/common/form/TextAreaInput";
import TextInput from "../../app/common/form/TextInput";
import { IContactFormValues } from "../../app/models/contact";
import { RootStoreContext } from "../../app/stores/rootStore";
import { values } from "mobx";
import { toast } from "react-toastify";
import { history } from "../..";

const validate = combineValidators({
  title: isRequired('Title'),
  description: isRequired('Message')
});

const ContactUs = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { createContact } = rootStore.contactStore;


  const handleSubmit = (values: any) => {
    if (user && user.role === 'Admin') {
      toast.error('Admins cannot use this form')
      setTimeout(() => history.push('/offers'), 1350);
      return;
    }
    const contact: IContactFormValues = {
      id: uuid(),
      userId: user ? user.id : null,
      email: user ? user.email : values.email,
      title: values.title,
      description: values.description
    }

    createContact(contact)
      .then(() => {
        toast.success('Message sent!')
        setTimeout(() => {
          history.push('/offers');
        }, 1350);
      })
      .catch(error => console.log(error));
  }

  return(
  <Container style={{ marginTop: '3rem' }}>
    <Grid centered>
      <Grid.Column width={8}>
        <Segment>
          <FinalForm
            onSubmit={handleSubmit}
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
                  type='submit'
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
