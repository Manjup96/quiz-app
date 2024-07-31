import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar'; 
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import { db } from '../../../Components/Firebase/FirebaseConfig';

const Scores = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [users, setUsers] = useState({}); // Store user names with ID as key

  useEffect(() => {
    const fetchScoresDetails = async () => {
      try {
        const scoresCollection = await db.collection('score').get();
        const scoresData = scoresCollection.docs.map(doc => ({
          id: doc.id,
          scores: doc.data().scores || []
        }));

        setScores(scoresData);

        // Fetch user names
        const userIds = scoresData.map(score => score.id); // Collect user IDs
        const userPromises = userIds.map(id => 
          db.collection('users').doc(id).get().then(userDoc => ({
            id: id,
            name: userDoc.exists ? userDoc.data().name : 'Unknown'
          }))
        );

        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});

        setUsers(usersMap);

      } catch (error) {
        console.error("Error in fetching Scores or Users:", error);
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Questions</th>
              <th>Correct Answers</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.flatMap(score => 
              score.scores.map((item, index) => (
                <tr key={`${score.id}-${index}`}>
                  <td>{users[score.id] || 'Unknown'}</td> {/* Display user name */}
                  <td>{item.totalQuestions || 'N/A'}</td>
                  <td>{item.correctAnswers || 'N/A'}</td>
                  <td>{item.time || 'N/A'}</td>
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
