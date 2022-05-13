import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import { DateInput } from "../../../../app/common/form/DateInput";
import ErrorMessage from "../../../../app/common/form/ErrorMessage";
import SelectInput from "../../../../app/common/form/SelectInput";
import TextInput from "../../../../app/common/form/TextInput";
import { gender } from "../../../../app/common/options/gender/genderOptions";
import { formats, modules } from "../../../../app/common/options/quill/quillOptions";
import { IJobSeeker, IJobSeekerFormValues } from "../../../../app/models/jobseeker";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const validate = combineValidators({
    firstName: isRequired('First Name'),
    lastName: isRequired('Last Name'),
    gender: isRequired('Gender')
    // birthday: isRequired('Birthday') 
});

interface IProps {
    profile: IJobSeeker; 
}

const JobSeekerSettings: React.FC<IProps> = ({ profile }) => {
    const rootStore = useContext(RootStoreContext);
    const { edit } = rootStore.jobSeekerStore;
    const { getUser } = rootStore.userStore;

    
    const [ bio, setBio] = useState(profile.bio);
    const getBirthday = () => {
        return new Date(profile.birthday);
    }

    const handleChange = (e) => {
        setBio(e);
    }

    const handleSubmit = (values: any) => {
        
        const jobseeker: IJobSeekerFormValues = {
            id: profile.id,
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            birthday: values.birthday,
            bio: bio
        }
        edit(jobseeker)
        .then(() => getUser())
        .catch(error => console.log(error))
        .finally(() => toast.success("Updated successfully"));
    }
    
    return(
        <FinalForm
        onSubmit={handleSubmit}
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
                content='Company Profile'
                color='grey'
                textAlign='left'
            />
            <Field
                name='firstName' 
                component={TextInput} 
                icon='user'
                iconPosition='left'
                placeholder='First Name' 
                initialValue={profile.firstName}
                />
            <Field
                name='lastName'
                component={TextInput}
                icon='map marker alternate'
                iconPosition='left'
                placeholder='Last Name'
                initialValue={profile.lastName}
            />
            <Field
                name='gender'
                component={SelectInput}
                options={gender}
                placeholder='Gender'
                initialValue={profile.gender}
            />
            {/* <Field
                name='birthday'
                component={DateInput}
                date={true}
                initialValue={new Date(profile.birthday)}
                placeholder='Birthday'
            /> */}
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
                text={submitError}
                />
            )}
            <Button
                disabled={invalid && !dirtySinceLastSubmit}
                loading={submitting}
                primary
                content='Edit'
                size='big'
                floated="right"
                circular
            />
            </Form>
        )}
        />
    );
}

export default observer(JobSeekerSettings);