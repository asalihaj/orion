
import { Table } from "semantic-ui-react";


interface IProps {
    reporter: any;
}

const ReporterListItem: React.FC<IProps> = ({ reporter }) => {
    return(
        <Table.Row>
            <Table.Cell>{reporter.username}</Table.Cell>
            <Table.Cell>{reporter.category}</Table.Cell>
            <Table.Cell>{reporter.lastUpdated}</Table.Cell>
        </Table.Row>
    );
}

export default ReporterListItem;