import { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import RegisterList from "./RegisterList";
import { history } from "../../..";
import RegisterForm from "./components/RegisterForm";

const Register = () => {
    const rootStore = useContext(RootStoreContext);
    const [type, setType] = useState('none');
    const { user } = rootStore.userStore;
    const path = document.location.search;
    

    useEffect(() => {
        if (user) {
            history.push('/offers');
        }
    }, [user]);
    
    return(
        <>
        { path.includes('type=company') ? (
            <RegisterForm formType='company' />
            
        ) : path.includes('type=jobseeker') ? (
            <RegisterForm formType='jobseeker' />
        ) : (
            <RegisterList />
        )}
        </>
    )
}

export default Register;