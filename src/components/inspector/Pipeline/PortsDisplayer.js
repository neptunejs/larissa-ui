import {createElement} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const PortsDisplayer = ({ports, title}) => {
    if (!ports.length) return null;
    return (
        <div>
            <h4>{title}</h4>
            <Table selectable={false}>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Links to</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {ports.map(renderRow)}
                </TableBody>
            </Table>
        </div>
    );
};

const renderRow = (row) => {
    return (
        <TableRow key={row.id}>
            <TableRowColumn>{row.name}</TableRowColumn>
            <TableRowColumn>{`${row.link.node.title} - ${row.link.name}`}</TableRowColumn>
        </TableRow>
    );
};

export default PortsDisplayer;
