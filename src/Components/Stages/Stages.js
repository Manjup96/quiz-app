import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Stages.css';
import passage1Img from '../Assets/images/img1.jpg';
import passage2Img from '../Assets/images/img2.jpg';
import passage3Img from '../Assets/images/img3.jpg';
import passage4Img from '../Assets/images/img4.jpg';
import passage5Img from '../Assets/images/img5.jpg';
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/FirebaseConfig';

function Stages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [scores, setScores] = useState([]);
  const [websiteCompleted, setWebsiteCompleted] = useState(false);
  const [passage1Completed, setPassage1Completed] = useState(false);
  const [passage1Green, setPassage1Green] = useState(false);

  const stages = ['Passage1', 'Passage2', 'Passage3', 'Passage4', 'Passage5'];

  const passages = {
    'Passage1': [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage4Img },
      { name: 'Jumbled words', img: passage3Img },
      { name: 'Spelling', img: passage5Img },
    ],
    'Passage2': [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage3Img },
      { name: 'Jumbled words', img: passage4Img },
      { name: 'Spelling', img: passage5Img },
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
          const fetchedScores = data.scores || [];
          setScores(fetchedScores);
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    const fetchWebsiteStatus = async () => {
      try {
        const passageDocRef = db.collection('passage').doc(user.uid);
        const doc = await passageDocRef.get();
        if (doc.exists) {
          const data = doc.data();
          if (data.status === 'completed') {
            setWebsiteCompleted(true);
          }
        }
      } catch (error) {
        console.error("Error fetching passage status:", error);
      }
    };

    fetchScores();
    fetchWebsiteStatus();
  }, [user.uid]);

  useEffect(() => {
    const checkAllPassage1Completed = () => {
      if (passages['Passage1']) {
        const allCompleted = passages['Passage1'].every(passage => isGreen(passage.name));
        setPassage1Completed(allCompleted);
        console.log("data", allCompleted);
        if (allCompleted) {
          setPassage1Green(true);
        }
      }
    };

    checkAllPassage1Completed();
  }, [scores, websiteCompleted]);

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passageName) => {
    setSelectedPassage(passageName);
    const navigationRoutes = {
      "website": "/website",
      "Vocabulary": "/Vocabulary",
      "Fill in the blanks": "/FillInTheBlank",
      "Jumbled words": "/Jumblewords",
      "Spelling": "/Spelling"
    };
    if (navigationRoutes[passageName]) {
      navigate(navigationRoutes[passageName]);
    }
  };

  const isGreen = (activity) => {
    if (activity === 'website' && websiteCompleted) {
      return true;
    }
    return scores.some(score => score.activity === activity);
  };

  return (
    <div className="card-container">
      {stages.map((stage, index) => {
        const stageButtonClass = (stage === 'Passage1' && passage1Green) ? 'green-filter' : '';

        return (
          <div className="stage-container" key={index}>
            <button className={`stage-button ${stageButtonClass}`} onClick={() => handleStageClick(stage)}>
              {stage}
            </button>
            {selectedStage === stage && (
              <div className="passage-structure">
                <div className="passage-row">
                  {passages[stage]?.map((passage, idx) => {
                    const greenFilter = isGreen(passage.name) ? 'green-filter' : '';

                    return (
                      <div key={idx}>
                        <div className={`passage-item ${greenFilter}`}
                          onClick={() => handlePassageClick(passage.name)}>
                          <img src={passage.img} alt={passage.name} />
                        </div>
                        {idx < passages[stage].length - 1 && <div className="connection-line"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stages;
