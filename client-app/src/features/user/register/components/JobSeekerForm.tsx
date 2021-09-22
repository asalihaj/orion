import { FORM_ERROR } from 'final-form';
import { useContext } from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import { DateInput } from '../../../../app/common/form/DateInput';
import ErrorMessage from '../../../../app/common/form/ErrorMessage';
import SelectInput from '../../../../app/common/form/SelectInput';
import TextInput from '../../../../app/common/form/TextInput';
import { gender } from '../../../../app/common/options/gender/genderOptions';
import { JobSeekerFormValues } from '../../../../app/models/jobseeker';
import { IUserFormValues } from '../../../../app/models/user';
import { RootStoreContext } from '../../../../app/stores/rootStore';

const validate = combineValidators({
    firstName: isRequired('First Name'),
    lastName: isRequired('Last Name'),
    gender: isRequired('Gender'),
    birthday: isRequired('Birthday')
});

const JobSeekerForm = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { register, getUser } = rootStore.userStore;
    const { create } = rootStore.jobSeekerStore;
    
    const handleSubmit = (values) => {
        const user: IUserFormValues = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        const result = register(user);

        result.then(data => {
            const profile: JobSeekerFormValues = {
                userId: data.id,
                firstName: values.firstName,
                lastName: values.lastName,
                gender: values.gender,
                birthday: values.birthday
            }
            create(profile)
            .then(() => getUser())
            .catch(error => ({
                [FORM_ERROR]: error
            }))
        }).catch(error => ({
            [FORM_ERROR]: error
        }));;
    }

    return (
        <FinalForm
        onSubmit={handleSubmit}
        initialValues={props.data}
        validate={validate}
        render={({
            handleSubmit,
            submitting,
            submitError,
            invalid,
            dirtySinceLastSubmit,
            values
        }) => (
            <Form size='big' onSubmit={handleSubmit} error>
                <Header
                    as='h2'
                    content='Login to JobPoint'
                    color='blue'
                    textAlign='left'
                />
                <Field
                    name='firstName' 
                    component={TextInput} 
                    icon='drivers license'
                    iconPosition='left'
                    initialValue={props.data.firstName}
                    placeholder='First Name' />
                <Field
                    name='lastName' 
                    component={TextInput}
                    icon='drivers license'
                    iconPosition='left'
                    initialValue={props.data.lastName}
                    placeholder='Last Name' />
                <Field
                    name='gender'
                    component={SelectInput}
                    options={gender}
                    initialValue={props.data.gender}
                    placeholder='Gender'
                />
                <Field
                    name='birthday'
                    date={true}
                    component={DateInput}
                    placeholder='Birthday'
                />
                {submitError && !dirtySinceLastSubmit && (
                    <ErrorMessage
                    error={submitError}
                    text='Invalid data'
                    />
                )}
                <Button
                    disabled={invalid}
                    loading={submitting}
                    type='submit'
                    floated='right'
                    primary
                    size='large'
                    circular>
                    Register
                    <Icon name='sign-in' corner='top right' />
                    </Button>
                <Button
                    onClick={() => props.prev(values)}
                    loading={submitting}
                    color='twitter'
                    floated='right'
                    size='large'
                    circular
                >
                    Back
                </Button>
            </Form>
        )}
        />
    );
        
}

export default JobSeekerForm;