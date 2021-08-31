import { useContext, useEffect } from "react";
import FormContainer from "../../../app/common/form/FormContainer";
import { RootStoreContext } from "../../../app/stores/rootStore";
import RegisterList from "./RegisterList";
import { history } from "../../..";


const Register = () => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    useEffect(() => {
        if (user) {
            history.push('/offers');
        }
    }, [user]);
    
    return(
        <RegisterList />
    )
}

export default Register;