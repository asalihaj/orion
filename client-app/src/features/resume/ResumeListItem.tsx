import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Item, Segment, Button, Label, Icon, Divider, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ApplicantList from "./ApplicantList";
import './styles.css'

interface IProps {
    resume: any;
}

const ResumeListItem: React.FC<IProps> = ({ resume }) => {
    const rootStore = useContext(RootStoreContext);
    const { downloadResumesLink } = rootStore.resumeStore;
    const [applicantDisplay, setApplicantDisplay] = useState(false);
    const [downloadLink, setDownloadLink] = useState('');
    const expired = new Date(resume.expDate) < new Date()


    const handleDownload = () => {
        if (resume.applicants === 0) {
            toast.info('There are no applicants in this offer');
            return;
        }
        downloadResumesLink(resume.id)
            .then(link => setDownloadLink(link.url))
            .catch(error => console.log(error.data.errors));
            window.open(downloadLink);
    }

    return(
        <Segment>
        <Item.Group>
            <Item>

            <Item.Content>
                <Item.Header>{resume.title}</Item.Header>
                <Item.Meta>
                    <Label color={expired ? 'red' : 'green'} >{format(resume.expDate!, 'dd/MM/yyyy HH:mm')} {expired ? '(Expired)' : '(Active)'}</Label>
                </Item.Meta>
                <Item.Meta>
                    <strong>{resume.category}</strong> {' '} {resume.location}
                </Item.Meta>
                <Item.Extra>{resume.location}</Item.Extra>
            </Item.Content>
            <Item.Content>
            </Item.Content>
            <Item.Content className="item-button-display">
                <Button animated='vertical' floated="right" size='small' primary circular onClick={handleDownload} >
                    <Button.Content visible>Download ({resume.applicants})</Button.Content>
                        <Button.Content hidden>
                            <Icon name='download' />
                        </Button.Content>
                    </Button>
            </Item.Content>
            
            </Item>
            <Divider />
            <Item>
            <Item.Extra className="resume-arrow">
                <div className="arrow-container">
                    <Icon 
                        onClick={() => setApplicantDisplay(!applicantDisplay)} 
                        name={applicantDisplay ? 'arrow up' : 'arrow down'} 
                        size='large'
                        disabled={resume.applicants > 0 ? false : true}
                        color={applicantDisplay ? 'grey' : 'black'} />
                </div>
            </Item.Extra>
            </Item>
            {applicantDisplay && <ApplicantList applicants={resume.applicantList} />}
            
        </Item.Group>
        </Segment>
    );
}

export default observer(ResumeListItem);