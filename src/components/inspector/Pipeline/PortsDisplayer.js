import {createElement, Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import IconButton from 'material-ui/IconButton';

class PortsDisplayer extends Component {
    render() {
        const {ports, title} = this.props;
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
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Links to</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {ports.map(this.renderRow.bind(this))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    renderRow(row) {
        return (
            <TableRow key={row.id}>
                <TableRowColumn>
                    <IconButton onClick={() => {
                        if (this.props.onDelete) {
                            this.props.onDelete(row);
                        }
                    }} iconClassName="material-icons">delete</IconButton></TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{`${row.link.node.title} - ${row.link.name}`}</TableRowColumn>
            </TableRow>
        );
    }
}

export default PortsDisplayer;
