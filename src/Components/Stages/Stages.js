import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Stages.css';
import passage1Img from '../Assets/images/img1.jpg';
import passage2Img from '../Assets/images/img2.jpg';
import passage3Img from '../Assets/images/img3.jpg';
import passage4Img from '../Assets/images/img4.jpg';
import passage5Img from '../Assets/images/img5.jpg';
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/FirebaseConfig'; // Import your firebase configuration

function Stages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [scores, setScores] = useState([]);

  const stages = ['Passage1', 'Passage2', 'Passage3', 'Passage4', 'Passage5'];

  const passages = {
    'Passage1': [
      { name: 'passage1', img: passage1Img },
      { name: 'passage2', img: passage2Img },
      { name: 'passage3', img: passage4Img },
      { name: 'passage4', img: passage3Img },
      { name: 'passage5', img: passage5Img },
      // { name: 'passage6', img: passage4Img }
    ],
    'Passage2': [
      { name: 'passage1', img: passage1Img },
      { name: 'passage2', img: passage2Img },
      { name: 'passage3', img: passage3Img },
      { name: 'passage4', img: passage4Img },
      { name: 'passage5', img: passage5Img },
    ],
    // Add other stages with corresponding passages
  };

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const userDocRef = db.collection('score').doc(user.uid);
        const doc = await userDocRef.get();
        if (doc.exists) {
          const data = doc.data();
          const fetchedScores = data.scores || []; // Default to an empty array if no scores field
          setScores(fetchedScores);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, [user.uid]);

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passageName, passageIndex) => {
    setSelectedPassage(passageName);
    const navigationRoutes = [
      "/website",
      "/Vocabulary",
      "/FillInTheBlank",
      "/Jumblewords",
      "/Spelling",
      // "/Comprehension"
    ];
    if (navigationRoutes[passageIndex]) {
      navigate(navigationRoutes[passageIndex]);
    }
  };

  const isGreen = (activity) => {
    const greenActivities = [
      'website',
      'Vocabulary',
      'Fill in the blanks',
      'Jumbled Words',
      'Spelling',
      // 'Comprehension',
    ];
    return greenActivities.includes(activity);
  };

  return (
    <div className="card-container">
      {stages.map((stage, index) => (
        <div className="stage-container" key={index}>
          <button className="stage-button" onClick={() => handleStageClick(stage)}>{stage}</button>
          {selectedStage === stage && (
            <div className="passage-structure">
              <div className="passage-row">
                {passages[stage].map((passage, idx) => (
                  <div
                  className={`passage-item ${idx !== 0 ? 'inactive' : 'active'}`}
                    key={idx}
                    onClick={() => handlePassageClick(passage.name, idx)}
                  >
                    <img src={passage.img} alt={passage.name} />
                    {idx < passages[stage].length - 1 && <div className="connection-line"></div>}
                  </div>
                ))}

                {passages[stage].map((passage, idx) => {
                  const correspondingScore = scores[idx];
                  const greenFilter = correspondingScore && isGreen(correspondingScore.activity) ? 'green-filter' : '';
                  
                  return (
                    <div
                      className={`passage-item ${greenFilter}`}
                      key={idx}
                      onClick={() => handlePassageClick(passage.name, idx)}
                    >
                      <img src={passage.img} alt={passage.name} />
                      {idx < passages[stage].length - 1 && <div className="connection-line"></div>}
                    </div>
                  );
                })}

              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stages;
