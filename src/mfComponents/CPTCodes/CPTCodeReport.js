import React, {useState, useEffect} from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// Service Layer
import CPTCodeService from '../../services/cptCode.service';

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        alignItems: 'center',
    },
    subTitle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 12,

    },
    text: {
        marginLeft: 12,
        marginRight: 12,
        fontSize: 10,
        textAlign: 'left',

    },
    columnHeadings: {
        margin: 8,
        fontSize: 10,
        fontWeight: 'bold',
        padding: 8,
        backgroundColor: 'blue',
        color: '#ffffff',
        flexDirection: 'row',
    },
    row: {
        marginRight: 8,
        marginLeft: 8,
        fontSize: 10,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        flexDirection: 'row',
    }
});


// Create Document Component
export default function CPTCodeReport() {
    const title = "CPT Code Report";
    const subTitle = "List of available Current Procedural Terminology (CPT) Codes"
    const [records, setRecords] = useState([]);
    const [colHdgItems, setColHdgItems] = useState();

    const colHdgs = [
        { field: 'cptCodeId', headerName: 'CPT Code', width: 75 },
        { field: 'cptDescription', headerName: 'CPT Description', width: 400 },
    ];

    useEffect(() => {
        // map  Headings
        if (!colHdgs) return <Text style={styles.text}>Not Specified</Text> 
        let mapResult = colHdgs.map((item, index) => {
            let width = item.width
            return (
                <Text key={index} style={[styles.text, width ? { width: width } : ""]}>{item.headerName}</Text>
            )
        })
        setColHdgItems(mapResult)
        getRecords()
    },[])

    async function getRecords() {
        try {
            const response = await CPTCodeService.getAllCPTCodes();
            setRecords(response.data);
        }
        catch (e) {
            console.log('CPT API call unsuccessful', e)
        }
    }
    


    return (
        <Document>
            <Page size="LETTER" style={styles.body} wrap>
                <Text style={styles.title} fixed>{title}</Text>
                <Text style={styles.subTitle} fixed>{subTitle}</Text>

                {/* Headings */}
                <View style={styles.columnHeadings}>
                    {colHdgItems}
                </View>
                
                {/* Data block  */}
                <View>
                    {records.length > 0
                        ? records.map((item, index) => {
                            // Row data
                            return (
                                <View key={index} style={styles.row}>
                                    <Text style={[styles.text, { width: colHdgs[0].width }]} > {item.cptCodeId} </Text>
                                    <Text style={[styles.text, { width: colHdgs[1].width }]} wrap > {item.cptDescription} </Text>
                                </View>
                            )
                        })
                        : () => {
                            return (
                                <View style={styles.row}>
                                    <Text style={styles.text} > No data to display </Text>
                                </View>)
                        }
                    }
                </View>
            </Page>
        </Document>
    )
}
