import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Card, Container } from "semantic-ui-react";
import ApplicantListItem from "./ApplicantListItem";

interface IProps {
    applicants: any[];
}

const ApplicantList: React.FC<IProps> = ({ applicants }) => {
    return(
        <Card fluid>
            <Card.Content>
                <Card.Header>Applicants</Card.Header>
            </Card.Content>
            <Container className='applicants-container' fluid>
                {applicants.map((applicant) => (<ApplicantListItem key={applicant.jobseeker.id} applicant={applicant} />))}
            </Container>
        </Card>
    );
}

export default observer(ApplicantList);