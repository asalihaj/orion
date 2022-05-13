import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import ResumeList from "./ResumeList";


const ResumeDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadResumes, loadingInitial } = rootStore.resumeStore;
    
    useEffect(() => {
        loadResumes();
    }, [loadResumes]);

    if (loadingInitial)
        return <LoadingComponent content="Loading resumes" />
    
    return(
        <div style={{ marginTop: '1.3rem'}}>
            <ResumeList />
        </div>
    );
}

export default observer(ResumeDashboard);