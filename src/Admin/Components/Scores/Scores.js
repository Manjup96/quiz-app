import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar';
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import { db } from '../../../Components/Firebase/FirebaseConfig';
import { PDFDownloadLink } from '@react-pdf/renderer';
import generatePDFDocument from './generatePDF';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


const Scores = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchScoresDetails = async () => {
      try {
        const scoresCollection = await db.collection('score').get();
        const scoresData = scoresCollection.docs.map(doc => ({
          id: doc.id,
          scores: doc.data().scores || []
        }));
        setScores(scoresData);

        const userIds = Array.from(new Set(scoresData.map(score => score.id)));
        console.log("User IDs to fetch:", userIds);

        const userPromises = userIds.map(id =>
          db.collection('users').doc(id).get().then(userDoc => {
            if (userDoc.exists) {
              console.log(`Fetched user ${id}:`, userDoc.data());
              return { id: id, name: userDoc.data().name };
            } else {
              console.warn(`No user found for ID ${id}`);
              return { id: id, name: 'Unknown' };
            }
          })
        );

        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});

        console.log("User names map:", usersMap);
        setUserNames(usersMap);

      } catch (error) {
        console.error("Error fetching Scores or Users:", error);
      }
    };

    fetchScoresDetails();
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="user-table-container">
        <h1 className='user-table-heading'>Scores Details</h1>
        <table style={{ marginLeft: "330px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Activity</th>
              <th>Total Questions</th>
              <th>Correct Answers</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scores.flatMap(score =>
              score.scores.map((item, index) => (
                <tr key={`${score.id}-${index}`}>
                  <td>{userNames[score.id]}</td>
                  <td>{item.activity}</td>
                  <td>{item.totalQuestions}</td>
                  <td>{item.correctAnswers}</td>
                  <td>{item.duration}</td>
                  <td>{item.date}</td>
                  <td>{item.startTime}</td>
                  <td>{item.endTime}</td>
                  <td>
                    <PDFDownloadLink
                      document={generatePDFDocument(
                        userNames[score.id],
                        item.activity,
                        item.totalQuestions,
                        item.correctAnswers,
                        item.duration,
                        item.date,
                        item.startTime,
                        item.endTime
                      )}
                      fileName={`${userNames[score.id]}_score.pdf`}
                    >
                      <FontAwesomeIcon icon={faFilePdf} />

                    </PDFDownloadLink>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scores;
