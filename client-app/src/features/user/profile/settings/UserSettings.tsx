import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { toast } from "react-toastify";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header, Icon, Label, Segment } from "semantic-ui-react";
import { history } from "../../../..";
import ErrorMessage from "../../../../app/common/form/ErrorMessage";
import TextInput from "../../../../app/common/form/TextInput";
import { IUser, IUserFormValues, UserFormValues } from "../../../../app/models/user";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import Login from "../../login/Login";
import './styles.css';

const validate = combineValidators({
    email: isRequired('Email'),
    username: isRequired('Username'),
    password: isRequired('Password') 
});

interface IProps {
    user: IUser;
}

const UserSettings: React.FC<IProps> = ({ user }) => {
    const rootStore = useContext(RootStoreContext);
    const { editUser, login, getUser, logout } = rootStore.userStore;
    const handleSubmit = (values: any) => {
        const userData: IUserFormValues = {
            id: user.id,
            username: values.username,
            email: values.email,
            password: values.password,
            newPassword: values.newPassword ? values.newPassword : null
        }
        
        editUser(userData)
        .then(() => {
            const newData: IUserFormValues = {
                email: userData.email,
                password: values.newPassword ? values.newPassword : userData.password,
                username: userData.username
            }
            login(newData)
            .then(() => getUser()
                .then(() => history.push(`/${userData.username}/edit`))
                .then(() => toast.success("Updated successfully")))
            .catch(e => logout())
        })
        .catch(error => toast.warning(error.data.errors));
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
                content='Account info'
                color='grey'
                textAlign='left'
            />
            <Field
                name='username' 
                component={TextInput} 
                icon='user'
                iconPosition='left'
                placeholder='Username' 
                initialValue={user.username}
                />
            <Field
                name='email'
                component={TextInput}
                icon='at'
                iconPosition='left'
                placeholder='Email'
                initialValue={user.email}
            />
            <Field
                name='password'
                component={TextInput}
                icon='lock'
                iconPosition='left'
                placeholder='Current Password'
                type='password'
            />
            <Field
                name='newPassword'
                component={TextInput}
                icon='lock'
                iconPosition='left'
                placeholder='New Password'
                type='password'
            />
            {submitError && !dirtySinceLastSubmit && (
                <ErrorMessage
                error={submitError}
                text={submitError}
                />
            )}
            <Button
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
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

export default observer(UserSettings);