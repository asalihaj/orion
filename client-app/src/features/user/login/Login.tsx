import { useContext, useEffect } from "react";
import FormContainer from "../../../app/common/form/FormContainer";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoginForm from "./LoginForm";
import LoginMessage from "./LoginMessage";
import { history } from "../../..";

const Login = () => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    useEffect(() => {
        if (user) {
            history.push('/offers');
        }
    }, [user]);
    
    return (
        <FormContainer form={<LoginForm />} message={<LoginMessage />}/>
    )
}

export default Login;