import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar';
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import { db } from '../../../Components/Firebase/FirebaseConfig'; // Ensure the path is correct
import '../../../Styles/Components/Scores.css'; // Import the CSS file

const Scores = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [userNames, setUserNames] = useState({}); // Store user names and student IDs with ID as key
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search query

  useEffect(() => {
    const fetchScoresDetails = async () => {
      try {
        // Fetch scores data
        const scoresCollection = await db.collection('score').get();
        const scoresData = scoresCollection.docs.map(doc => ({
          id: doc.id,
          scores: doc.data().scores || []
        }));

        // Flatten all scores into a single array and add userId to each score
        const allScores = scoresData.flatMap(scoreDoc => 
          (scoreDoc.scores || []).map(score => ({
            ...score,
            userId: scoreDoc.id
          }))
        );

        // Sort the scores by date and startTime in descending order
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

        // Collect unique user IDs from sorted scores
        const userIds = Array.from(new Set(allScores.map(score => score.userId)));
        console.log("User IDs to fetch:", userIds);

        // Fetch user names and student IDs based on user IDs
        const userPromises = userIds.map(id =>
          db.collection('users').doc(id).get().then(userDoc => {
            if (userDoc.exists) {
              console.log(`Fetched user ${id}:`, userDoc.data());
              return { id: id, name: userDoc.data().name, studentId: userDoc.data().id, mobile: userDoc.data().mobile };
            } else {
              console.warn(`No user found for ID ${id}`);
              return { id: id, name: 'Unknown', studentId: 'Unknown' };
            }
          })
        );

        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = { name: user.name, studentId: user.studentId, mobile: user.mobile };
          return acc;
        }, {});

        console.log("User names and student IDs map:", usersMap);
        setUserNames(usersMap);

      } catch (error) {
        console.error("Error fetching Scores or Users:", error);
      }
    };

    fetchScoresDetails();
  }, []);

  // Filter scores based on the search query
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

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="score-table-container">
        <div className="score-table-header">
          <h2 className='score-table-heading'>Score Details</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="score-search-input"
          />
        </div>
        <div className='table-main'>
          <table className='score_table_main'>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Activity</th>
                <th>Total Questions</th>
                <th>Correct Answers</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End time</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.map((score, index) => (
                <tr key={`${score.userId}-${index}`}>
                  <td>{userNames[score.userId]?.studentId || 'Unknown'}</td> {/* Display student ID */}
                  <td>{userNames[score.userId]?.name || 'Unknown'}</td>
                  <td>{userNames[score.userId]?.mobile || 'Unknown'}</td> {/* Display user name */}
                  <td>{score.activity}</td>
                  <td>{score.totalQuestions}</td>
                  <td>{score.correctAnswers}</td>
                  <td>{score.duration}</td>
                  <td>{score.date}</td>
                  <td>{score.startTime}</td>
                  <td>{score.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scores;
