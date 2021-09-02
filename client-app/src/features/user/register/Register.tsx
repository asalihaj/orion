import { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import RegisterList from "./RegisterList";
import { history } from "../../..";
import { Button } from "semantic-ui-react";

const Register = () => {
    const rootStore = useContext(RootStoreContext);
    const [type, setType] = useState('none');
    const { user } = rootStore.userStore;
    const { get, getCompany } = rootStore.companyStore;

    useEffect(() => {
        get('b7ae6b31-86c5-4fd2-9b47-2b7db5313a2e');
        console.log(getCompany());
        if (user) {
            history.push('/offers');
        }
        history.listen((location) => {
            console.log(location.search);
            const type = location.search.slice(6);
            if (type === 'company')
                setType('company');
            else if (type === 'jobseeker')
                setType('jobseeker');
            else
                setType('none');
        });
    }, [user, history.listen, get]);
    
    return(
        <>
        {type === 'company' ? (
            <div>
                <Button
                onClick={() => {
                    setType('none')
                    history.push({ search: null })
                    
                }}
                >
                    Back
                </Button>
            </div>
        ) : type === 'jobseeker' ? (
            <div>JOBSEEKER FORM</div>
        ) : (
            <RegisterList />
        )}
        </>
    )
}

export default Register;