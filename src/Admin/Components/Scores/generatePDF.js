import React from 'react';
import { Page, Document, StyleSheet, Text, View, Font } from '@react-pdf/renderer';

// Register font if needed (example with Roboto)
Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 5,
  },
  tableCol: {
    width: '10%',
    textAlign: 'center',
  },
});

const ScoresPDF = ({ scores, userNames }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Score Details</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol}>S.No</Text>
          <Text style={styles.tableCol}>Student ID</Text>
          <Text style={styles.tableCol}>Name</Text>
          <Text style={styles.tableCol}>Mobile</Text>
          <Text style={styles.tableCol}>Activity</Text>
          <Text style={styles.tableCol}>Total Questions</Text>
          <Text style={styles.tableCol}>Correct Answers</Text>
          <Text style={styles.tableCol}>Duration</Text>
          <Text style={styles.tableCol}>Date</Text>
          <Text style={styles.tableCol}>Start Time</Text>
          <Text style={styles.tableCol}>End Time</Text>
        </View>
        {scores.map((score, index) => (
          <View key={`${score.userId}-${index}`} style={styles.tableRow}>
            <Text style={styles.tableCol}>{index + 1}</Text>
            <Text style={styles.tableCol}>{userNames[score.userId]?.studentId || 'Unknown'}</Text>
            <Text style={styles.tableCol}>{userNames[score.userId]?.name || 'Unknown'}</Text>
            <Text style={styles.tableCol}>{userNames[score.userId]?.mobile || 'Unknown'}</Text>
            <Text style={styles.tableCol}>{score.activity}</Text>
            <Text style={styles.tableCol}>{score.totalQuestions}</Text>
            <Text style={styles.tableCol}>{score.correctAnswers}</Text>
            <Text style={styles.tableCol}>{score.duration}</Text>
            <Text style={styles.tableCol}>{score.date}</Text>
            <Text style={styles.tableCol}>{score.startTime}</Text>
            <Text style={styles.tableCol}>{score.endTime}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ScoresPDF;
