import React from 'react'
import { Chip as MuiChip } from '@material-ui/core'




export default function Chip(props) {
    const { label, size, color, backgroundColor, ...other} = props

    return (

            <MuiChip
                label={label}
                size={size || "small"}
                color="primary"
                {...other}
                />

    )
}
