import { FORM_ERROR } from "final-form";
import { useContext } from "react";
import { Field, Form as FinalForm } from 'react-final-form';
import { Link } from "react-router-dom";
import { combineValidators, isRequired } from "revalidate";
import { Button, Container, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
});

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <Container style={{ marginTop: '20rem' }}>
            <Grid centered>
                <Grid.Column textAlign='center' width={6}>
                    <Segment padded>
                        <FinalForm
                        onSubmit={(values: IUserFormValues) => 
                            login(values).catch(error => ({
                                [FORM_ERROR]: error
                            }))
                        }
                        validate={validate}
                        render={({
                            handleSubmit,
                            submitting,
                            submitError,
                            invalid,
                            pristine,
                            dirtySinceLastSubmit
                        }) => (
                            <Form size='big' onSubmit={handleSubmit} error>
                            <Header
                                as='h2'
                                content='Login to JobPoint'
                                color='blue'
                                textAlign='left'
                            />
                            <Field
                                name='email' 
                                component={TextInput} 
                                placeholder='Email' />
                            <Field
                                name='password'
                                component={TextInput}
                                placeholder='Password'
                                type='password'
                            />
                            {submitError && !dirtySinceLastSubmit && (
                                <ErrorMessage
                                error={submitError}
                                text='Invalid email or password'
                                />
                            )}
                            <Button
                                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                                loading={submitting}
                                primary
                                content='Login'
                                size='big'
                                fluid
                                circular
                            />
                            </Form>
                        )}
                        />
                    </Segment>
                    <Message attached='bottom' color='blue'>
                        Don't have an account? 
                        <Message.Header as={Link} to='/register' >
                            Join now
                        </Message.Header>
                    </Message>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default LoginForm;