import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        flexDirection: 'row',
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
        fontFamily: 'Roboto',
    },
    subTitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Roboto',
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'left',
        fontFamily: 'Roboto'
    },
    emphasis: {
        margin: 12,
        fontSize: 14,
        color: '#F22300',
        fontFamily: 'Roboto',
    }
});

// Create Document Component
const MyDocument = () => (
  <Document>
        <Page size="LETTER" style={styles.body} wrap>
            <View fixed>
                Header Info goes here
            </View>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>    
            </View>
        </Page>
  </Document>
);
