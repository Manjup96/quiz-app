import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Stages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);

  const stages = ['stage0', 'stage1', 'stage2', 'stage3', 'stage4'];
  const passages = {
    'stage0': ['passage1', 'passage2', 'passage3', 'passage4', 'passage5'],
    'stage1': ['passage1', 'passage2', 'passage3', 'passage4', 'passage5'],
    // Add other stages with corresponding passages
  };

  const passageToPage = {
    'passage1': 1,
    'passage2': 2,
    'passage3': 3,
    'passage4': 4,
    'passage5': 5,
  };

  const passageUrl = 'http://127.0.0.1:5501/index.html';

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passage) => {
    setSelectedPassage(passage);
    const pageNumber = passageToPage[passage];
    const userName = user?.name || 'user';
    const userId = user?.uid || 'unknown';
    const url = `${passageUrl}?page=${pageNumber}&name=${encodeURIComponent(userName)}&uid=${encodeURIComponent(userId)}`;
    navigate(`/website?src=${encodeURIComponent(url)}`);
  };

  return (
    <div>
      {stages.map((stage, index) => (
        <div key={index}>
          <button onClick={() => handleStageClick(stage)}>{stage}</button>
          {selectedStage === stage && (
            <div>
              {passages[stage].map((passage, index) => (
                <div key={index}>
                  <button onClick={() => handlePassageClick(passage)}>{passage}</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stages;
