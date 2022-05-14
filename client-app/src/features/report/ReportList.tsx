import { memo, useContext, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ReportListItem from "./ReportListItem";

const ReportList = memo(() => {
    const rootStore = useContext(RootStoreContext);
    const { getReports } = rootStore.reportStore;
    const reports = getReports();
    
    return(
        <Segment className="segment-list-style">
            {reports.map(report => <ReportListItem key={report.id} report={report} />)}
        </Segment>
    );
})

export default ReportList;