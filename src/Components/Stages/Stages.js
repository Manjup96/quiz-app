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
  const [passageCompletion, setPassageCompletion] = useState({});

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
    'Passage3': [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage4Img },
      { name: 'Jumbled words', img: passage3Img },
      { name: 'Spelling', img: passage5Img },
    ],
    'Passage4': [
      { name: 'website', img: passage1Img },
      { name: 'Vocabulary', img: passage2Img },
      { name: 'Fill in the blanks', img: passage3Img },
      { name: 'Jumbled words', img: passage4Img },
      { name: 'Spelling', img: passage5Img },
    ],
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

    const fetchPassageCompletionStatus = async () => {
      try {
        const passageCollections = {
          'Passage1': 'passage',
          'Passage2': 'passage2',
          'Passage3': 'passage3',
          'Passage4': 'passage4',
        };

        const fetchStatusForStage = async (stage) => {
          const collectionName = passageCollections[stage];
          if (collectionName) {
            const passageDocRef = db.collection(collectionName).doc(user.uid);
            const doc = await passageDocRef.get();
            if (doc.exists) {
              const data = doc.data();
              const completionStatus = {};
              passages[stage].forEach(passage => {
                completionStatus[passage.name] = data.status?.[passage.name] === 'completed';
              });
              return completionStatus;
            }
          }
          return {};
        };

        const completionStatuses = {};
        for (const stage of stages) {
          completionStatuses[stage] = await fetchStatusForStage(stage);
        }
        setPassageCompletion(completionStatuses);
      } catch (error) {
        console.error("Error fetching passage status:", error);
      }
    };

    fetchScores();
    fetchPassageCompletionStatus();
  }, [user.uid]);

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passageName, stage) => {
    setSelectedPassage(passageName);
    const navigationRoutes = {
      'Passage1': {
        "website": "/website",
        "Vocabulary": "/Vocabulary",
        "Fill in the blanks": "/FillInTheBlank",
        "Jumbled words": "/Jumblewords",
        "Spelling": "/Spelling"
      },
      'Passage2': {
        "website": "/website2",
        "Vocabulary": "/Vocabulary2",
        "Fill in the blanks": "/FillInTheBlank2",
        "Jumbled words": "/Jumblewords2",
        "Spelling": "/Spelling2"
      },
      'Passage3': {
        "website": "/website3",
        "Vocabulary": "/Vocabulary3",
        "Fill in the blanks": "/FillInTheBlank3",
        "Jumbled words": "/Jumblewords3",
        "Spelling": "/Spelling3"
      },
      'Passage4': {
        "website": "/website4",
        "Vocabulary": "/Vocabulary4",
        "Fill in the blanks": "/FillInTheBlank4",
        "Jumbled words": "/Jumblewords4",
        "Spelling": "/Spelling4"
      },
    };

    const route = navigationRoutes[stage]?.[passageName];
    if (route) {
      navigate(route);
    }
  };

  const isGreen = (activity, stage) => {
    return passageCompletion[stage]?.[activity] || scores.some(score => score.activity === activity);
  };

  return (
    <div className="card-container">
      {stages.map((stage, index) => {
        const stageButtonClass = passages[stage]?.every(p => isGreen(p.name, stage)) ? 'green-filter' : '';

        return (
          <div className="stage-container" key={index}>
            <button className={`stage-button ${stageButtonClass}`} onClick={() => handleStageClick(stage)}>
              {stage}
            </button>
            {selectedStage === stage && (
              <div className="passage-structure">
                <div className="passage-row">
                  {passages[stage]?.map((passage, idx) => {
                    const greenFilter = isGreen(passage.name, stage) ? 'green-filter' : '';

                    return (
                      <div key={idx}>
                        <div className={`passage-item ${greenFilter}`}
                          onClick={() => handlePassageClick(passage.name, stage)}>
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
