import { format, formatDistance, subDays } from "date-fns";
import { observer } from "mobx-react-lite";
import { Button, Card, Feed, Image } from "semantic-ui-react";
import { getBirthday } from "../../app/common/util/util";

interface IProps {
    applicant: any;
}

const ApplicantListItem: React.FC<IProps> = ({ applicant }) => {
    const { jobseeker } = applicant;
    
    const applicationDate = () => {
        const date = format(new Date(applicant.lastUpdated), 'dd/MM/yyyy HH:mm')
        return date;
    }

    const handleDownload = () => {
        window.open(applicant.cv);
    }

    return(
        <Card fluid>
                <Card.Content>
                    <Image floated='left' size='mini' src={jobseeker.url || '/assets/user.png'} circular />
                    <Card.Header>{jobseeker.firstName + ' ' + jobseeker.lastName}</Card.Header>
                    <Card.Meta>Applied on {applicationDate()}</Card.Meta>
                    <Card.Description><strong>Gender:</strong> {jobseeker.gender === 'm' ? 'Male' : 'Female'}
                    <Button floated="right" onClick={handleDownload} circular primary inverted>Download</Button>
                    
                    <Card.Description><strong>Age:</strong> {getBirthday(jobseeker.birthday)}</Card.Description>
                    </Card.Description>
                </Card.Content>
            </Card>
    );
}

export default observer(ApplicantListItem);