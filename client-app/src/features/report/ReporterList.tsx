import { observer } from "mobx-react-lite";
import { Card, Container, Table } from "semantic-ui-react";
import ReporterListItem from "./ReporterListItem";

interface IProps {
    reporters: any[];
}

const ReporterList: React.FC<IProps> = ({ reporters }) => {
    return(
        <Card fluid>
            <Card.Content>
                <Card.Header>Reported by</Card.Header>
            </Card.Content>
            <Container className='applicants-container' fluid>
            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                    {reporters.map(reporter => (<ReporterListItem key={reporter.username} reporter={reporter} />))}
                </Table.Body>
            </Table>  
            </Container>
        </Card>
    );
}

export default observer(ReporterList);