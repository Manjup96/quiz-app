import React, { useState, useEffect } from 'react';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar'; 
import Header from '../../../Admin/Components/Header/Header';
import { useAuth } from '../../../Components/Context/AuthContext';
import { db } from '../../../Components/Firebase/FirebaseConfig';

const Scores = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [userNames, setUserNames] = useState({}); // Store user names with ID as key

  useEffect(() => {
    const fetchScoresDetails = async () => {
      try {
        // Fetch scores data
        const scoresCollection = await db.collection('score').get();
        const scoresData = scoresCollection.docs.map(doc => ({
          id: doc.id,
          scores: doc.data().scores || []
        }));
        setScores(scoresData);

        // Collect unique user IDs
        const userIds = Array.from(new Set(scoresData.map(score => score.id)));
        console.log("User IDs to fetch:", userIds);

        // Fetch user names based on user IDs
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Activity</th>
              <th>Total Questions</th>
              <th>Correct Answers</th>
              <th>Time</th>
             
            </tr>
          </thead>
          <tbody>
            {scores.flatMap(score => 
              score.scores.map((item, index) => (
                <tr key={`${score.id}-${index}`}>
                  <td>{userNames[score.id] || 'Unknown'}</td> {/* Display user name */}
                  <td>{item. activity || 'N/A'}</td>
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
