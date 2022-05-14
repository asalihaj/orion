import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import ReportList from "./ReportList";

const ReportsDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadReports, loadingInitial } = rootStore.reportStore;

    useEffect(() => {
        loadReports();
    }, [loadReports])

    
    if (loadingInitial)
        return <LoadingComponent content='Loading messages' />
        
    return(
        <div style={{ marginTop: '1.3rem', marginBottom: '1.7rem' }}>
            <ReportList />
        </div>
    );
}

export default observer(ReportsDashboard);