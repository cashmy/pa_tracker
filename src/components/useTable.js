import React from 'react';
import { Table } from '@material-ui/core'

export default function useTable(records, columns) {

    const TblContainer = props => (
        <Table>
            {props.children}
        </Table>
    )
    return {
        TblContainer
    }
}