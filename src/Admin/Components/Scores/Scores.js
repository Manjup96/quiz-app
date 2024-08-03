import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar';
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import { db } from '../../../Components/Firebase/FirebaseConfig';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import '../../../Styles/Components/Scores.css';
import { Pagination, Modal, Button } from "react-bootstrap";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "7%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
  },
  tableColWide: {
    width: "14%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  }
});

const ScoresPDF = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Score Details</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text style={styles.tableCell}>S.No</Text></View>
          <View style={styles.tableColWide}><Text style={styles.tableCell}>Student ID</Text></View>
          <View style={styles.tableColWide}><Text style={styles.tableCell}>Name</Text></View>
          <View style={styles.tableColWide}><Text style={styles.tableCell}>Mobile</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Activity</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Total Questions</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Correct Answers</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Duration</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Date</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>Start Time</Text></View>
          <View style={styles.tableCol}><Text style={styles.tableCell}>End Time</Text></View>
        </View>
        {data.map((score, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{index + 1}</Text></View>
            <View style={styles.tableColWide}><Text style={styles.tableCell}>{score.studentId}</Text></View>
            <View style={styles.tableColWide}><Text style={styles.tableCell}>{score.name}</Text></View>
            <View style={styles.tableColWide}><Text style={styles.tableCell}>{score.mobile}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{score.activity}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{score.totalQuestions}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{score.correctAnswers}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{score.duration}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{score.date}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{score.startTime}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{score.endTime}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const Scores = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestionScores, setSelectedQuestionScores] = useState([]);

  useEffect(() => {
    const fetchScoresDetails = async () => {
      try {
        const scoresCollection = await db.collection('score').get();
        const scoresData = scoresCollection.docs.map(doc => ({
          id: doc.id,
          scores: doc.data().scores || []
        }));

        const allScores = scoresData.flatMap(scoreDoc =>
          (scoreDoc.scores || []).map(score => ({
            ...score,
            userId: scoreDoc.id
          }))
        );

        allScores.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;
          if (a.startTime > b.startTime) return -1;
          if (a.startTime < b.startTime) return 1;
          return 0;
        });

        setScores(allScores);

        const userIds = Array.from(new Set(allScores.map(score => score.userId)));
        const userPromises = userIds.map(id =>
          db.collection('users').doc(id).get().then(userDoc => {
            if (userDoc.exists) {
              return { id: id, name: userDoc.data().name, studentId: userDoc.data().id, mobile: userDoc.data().mobile };
            } else {
              return { id: id, name: 'Unknown', studentId: 'Unknown' };
            }
          })
        );

        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = { name: user.name, studentId: user.studentId, mobile: user.mobile };
          return acc;
        }, {});

        setUserNames(usersMap);

      } catch (error) {
        console.error("Error fetching Scores or Users:", error);
      }
    };

    fetchScoresDetails();
  }, []);

  const filteredScores = scores.filter(score => {
    const userId = userNames[score.userId]?.studentId || 'Unknown';
    const userName = userNames[score.userId]?.name || 'Unknown';
    const mobile = userNames[score.userId]?.mobile || 'Unknown';
    return (
      userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      score.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      score.date.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastScore = currentPage * pageSize;
  const indexOfFirstScore = indexOfLastScore - pageSize;
  const currentScores = filteredScores.slice(indexOfFirstScore, indexOfLastScore);

  const totalPages = Math.ceil(filteredScores.length / pageSize);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return (
      <Pagination>
        <Pagination.Prev
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {pages}
        <Pagination.Next
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  const handleViewClick = (questionScores) => {
    setSelectedQuestionScores(questionScores);
    setShowModal(true);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="score-table-container">
        <div className="score-table-header">
          <h2 className='score-table-heading'>Score Details</h2>
          <PDFDownloadLink
            document={<ScoresPDF data={filteredScores.map((score, index) => ({
              studentId: userNames[score.userId]?.studentId || 'Unknown',
              name: userNames[score.userId]?.name || 'Unknown',
              mobile: userNames[score.userId]?.mobile || 'Unknown',
              activity: score.activity,
              totalQuestions: score.totalQuestions,
              correctAnswers: score.correctAnswers,
              duration: score.duration,
              date: score.date,
              startTime: score.startTime,
              endTime: score.endTime
            }))} />}
            fileName="score_details.pdf"
          >
            {({ loading }) =>
              loading ? 'Loading document...' : <Button variant="primary">Download PDF</Button>
            }
          </PDFDownloadLink>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Activity</th>
                <th>Total Questions</th>
                <th>Correct Answers</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {currentScores.map((score, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{userNames[score.userId]?.studentId || 'Unknown'}</td>
                  <td>{userNames[score.userId]?.name || 'Unknown'}</td>
                  <td>{userNames[score.userId]?.mobile || 'Unknown'}</td>
                  <td>{score.activity}</td>
                  <td>{score.totalQuestions}</td>
                  <td>{score.correctAnswers}</td>
                  <td>{score.duration}</td>
                  <td>{score.date}</td>
                  <td>{score.startTime}</td>
                  <td>{score.endTime}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleViewClick(score.questionScores)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center mt-2">
          {renderPagination()}
        </div>
      </div>

      {/* Modal for displaying questionScores */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Question Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                {selectedQuestionScores.map((q, index) => (
                  <th key={index}>Question {q.questionNumber}</th>
                ))}
                <th>Total</th> {/* Column for total */}
              </tr>
            </thead>
            <tbody>
              <tr>
                {selectedQuestionScores.map((q, index) => (
                  <td key={index}>{q.score}</td>
                ))}
                <td>
                  {selectedQuestionScores.reduce((sum, q) => sum + q.score, 0)} / {selectedQuestionScores.length}
                </td> {/* Total count */}
              </tr>
            </tbody>
          </table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Scores;
