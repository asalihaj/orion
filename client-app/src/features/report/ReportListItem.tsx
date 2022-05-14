import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Item, Segment, Image, Message, Label, Icon, Button } from "semantic-ui-react";
import { history } from "../..";
import { RootStoreContext } from "../../app/stores/rootStore";
import ReporterList from "./ReporterList";

interface IProps {
    report: any;
}

const ReportListItem: React.FC<IProps> = ({ report }) => {
    const rootStore = useContext(RootStoreContext);
    const { deleteOffer }  = rootStore.offerStore;
    const { loadReports } = rootStore.reportStore;
    const { publisher } = report;
    const expired = new Date(report.expDate) < new Date()
    const [reportersDisplay, setReportersDisplay] = useState(false);

    const handleDeleteOffer = () => {
        deleteOffer(report.id)
            .then(() => loadReports().then(() => toast.success("Offer deleted successfully")))
            .catch(error => console.log(error));
    }

    return(
        <Segment>
            <Item.Group>
                <Item>
                <Image className="image-border" size='tiny' src={publisher.url ? publisher.url : '/assets/user.png'} />
                <Item.Content>
                    <Item.Header>{report.title}</Item.Header>
                    <Item.Content>{report.publisher.name}</Item.Content>
                    <Item.Meta>
                        <Label color={expired ? 'red' : 'green'}>
                        {format(report.expDate!, 'dd/MM/yyyy')}
                        </Label>
                        </Item.Meta>
                    <Item.Description>
                        
                    </Item.Description>
                </Item.Content>
                <Item.Content className="item-button-display">
                    <Button 
                        animated='vertical' 
                        floated="right" 
                        size='small' 
                        color="red" 
                        inverted
                        onClick={handleDeleteOffer}
                        circular >
                        <Button.Content visible>
                                Delete
                        </Button.Content>
                            <Button.Content hidden>
                                <Icon name='trash alternate' />
                            </Button.Content>
                        </Button>
                </Item.Content>
                </Item>
                <Item>
                <Item.Extra className="resume-arrow">
                    <div className="arrow-container">
                        <Icon 
                            onClick={() => setReportersDisplay(!reportersDisplay)} 
                            name={reportersDisplay ? 'arrow up' : 'arrow down'} 
                            size='large'
                            disabled={report.reporters.length > 0 ? false : true}
                            color={reportersDisplay ? 'grey' : 'black'} />
                    </div>
                </Item.Extra>
                </Item>
                {reportersDisplay && <ReporterList reporters={report.reporters} />}
                </Item.Group>
        </Segment>
    );
}

export default observer(ReportListItem);