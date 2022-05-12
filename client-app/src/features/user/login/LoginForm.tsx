import { FORM_ERROR } from "final-form";
import { useContext } from "react";
import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../../app/common/form/ErrorMessage";
import TextInput from "../../../app/common/form/TextInput";
import { IUserFormValues } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
});

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm
        onSubmit={(values: IUserFormValues) => 
            login(values)
            .catch(error => ({
                [FORM_ERROR]: error.data.errors
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
            {submitError && (
                <ErrorMessage
                error={submitError}
                text={submitError}
                />
            )}
            <Button
                disabled={pristine}
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
    );
}

export default LoginForm;