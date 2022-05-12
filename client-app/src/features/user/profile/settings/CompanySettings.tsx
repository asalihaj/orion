import { useContext, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../../../app/common/form/ErrorMessage";
import TextInput from "../../../../app/common/form/TextInput";
import { formats, modules } from "../../../../app/common/options/quill/quillOptions";
import { ICompany, ICompanyFormValues } from "../../../../app/models/company";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const validate = combineValidators({
    name: isRequired('Name'),
    location: isRequired('Location') 
});

interface IProps {
    profile: ICompany; 
}

const CompanySettings: React.FC<IProps> = ({ profile }) => {
    const rootStore = useContext(RootStoreContext);
    const { edit } = rootStore.companyStore;
    const { getUser } = rootStore.userStore;

    
    const [ description, setDescription] = useState(profile.description);

    const handleChange = (e) => {
        setDescription(e);
    }

    const handleSubmit = (values: any) => {
        
        const company: ICompanyFormValues = {
            id: profile.id,
            name: values.name,
            location: values.location,
            description: description
        }
        
        edit(company)
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
                name='name' 
                component={TextInput} 
                icon='user'
                iconPosition='left'
                placeholder='Name' 
                initialValue={profile.name}
                />
            <Field
                name='location'
                component={TextInput}
                icon='map marker alternate'
                iconPosition='left'
                placeholder='Location'
                initialValue={profile.location}
            />
            <ReactQuill 
                className='margin-bottom'
                theme="snow" 
                value={description} 
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

export default CompanySettings;