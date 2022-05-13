import { FORM_ERROR } from 'final-form';
import { useContext, useState } from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import ReactQuill from 'react-quill';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import { DateInput } from '../../../../app/common/form/DateInput';
import ErrorMessage from '../../../../app/common/form/ErrorMessage';
import { modules, formats } from '../../../../app/common/options/quill/quillOptions';
import SelectInput from '../../../../app/common/form/SelectInput';
import TextInput from '../../../../app/common/form/TextInput';
import { gender } from '../../../../app/common/options/gender/genderOptions';
import { IJobSeekerFormValues } from '../../../../app/models/jobseeker';
import { IUserFormValues } from '../../../../app/models/user';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { getBirthday } from '../../../../app/common/util/util';
import { toast } from 'react-toastify';

const validate = combineValidators({
    firstName: isRequired('First Name'),
    lastName: isRequired('Last Name'),
    gender: isRequired('Gender'),
    birthday: isRequired('Birthday')
});

const JobSeekerForm = (props) => {
    const rootStore = useContext(RootStoreContext);
    const { register, getUser } = rootStore.userStore;
    const { setToken } = rootStore.commonStore;
    const { create } = rootStore.jobSeekerStore;

    const [ bio, setBio] = useState('');

    const handleChange = (e) => {
        setBio(e);
    }
    
    const handleSubmit = (values) => {
        if (getBirthday(values.birthday) < 18)
        {
            toast.warning("You should be at least 18 in order to register");
            return;
        } 
        
        const user: IUserFormValues = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        register(user)
            .then(data => {
                const profile: IJobSeekerFormValues = {
                    id: data.id,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    gender: values.gender,
                    bio: bio,
                    birthday: values.birthday
                }
                create(profile)
                .then(() => setToken(data.token))
                .finally(() => getUser())
                .catch(error => ({
                    [FORM_ERROR]: error
                }));
            }).catch(error => {
                const errorType = error.data.errors;
                if(errorType.Email) {
                    values.errorCode = 1;
                    values.errorMessage = errorType.Email;
                } else if (errorType.Username) {
                    values.errorCode = 2;
                    values.errorMessage = errorType.Username;
                } else if (errorType.Password) {
                    values.errorCode = 3;
                    values.errorMessage = errorType.Password;
                } else {
                    values.errorCode = 4;
                    values.errorMessage = 'Something went wrong during registration'
                }

                console.log(error);
                props.prev(values);
            });
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
                <ReactQuill 
                    className='margin-bottom'
                    theme="snow" 
                    value={bio} 
                    placeholder='Write description here... (optional)'
                    modules={modules}
                    formats={formats}
                    onChange={handleChange}
                />
                {submitError && !dirtySinceLastSubmit && (
                    <ErrorMessage
                    error={submitError}
                    text='Invalid data'
                    />
                )}
                <Button
                    animated
                    disabled={invalid}
                    loading={submitting}
                    type='submit'
                    floated='right'
                    primary
                    size='large'
                    circular>
                        <Button.Content visible>Register</Button.Content>
                        <Button.Content hidden>
                        <Icon name='sign-in' corner='top right' />
                        </Button.Content>
                </Button>
                <Button 
                    animated
                    onClick={() => props.prev(values)}
                    loading={submitting}
                    color='twitter'
                    floated='right'
                    size='large'
                    circular
                >
                    <Button.Content visible>Back</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left'/>
                    </Button.Content>
                </Button>
            </Form>
        )}
        />
    );
        
}

export default JobSeekerForm;