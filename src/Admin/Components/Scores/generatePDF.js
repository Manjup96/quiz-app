// src/utils/generatePDF.js
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const generatePDFDocument = (userName, activity, totalQuestions, correctAnswers, duration, date, startTime, endTime) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Score Details</Text>
        <Text style={styles.text}>Name: {userName}</Text>
        <Text style={styles.text}>Activity: {activity}</Text>
        <Text style={styles.text}>Total Questions: {totalQuestions}</Text>
        <Text style={styles.text}>Correct Answers: {correctAnswers}</Text>
        <Text style={styles.text}>Duration: {duration}</Text>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.text}>Start Time: {startTime}</Text>
        <Text style={styles.text}>End Time: {endTime}</Text>
      </View>
    </Page>
  </Document>
);

export default generatePDFDocument;
