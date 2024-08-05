import React, { useState } from 'react';

function Stages() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);

  const stages = ['stage0', 'stage1', 'stage2', 'stage3', 'stage4'];
  const passages = ['passage1', 'passage2', 'passage3', 'passage4', 'passage5'];

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passage) => {
    setSelectedPassage(passage);
    window.location.href = 'http://127.0.0.1:5500/index.html';
  };

  return (
    <div>
      {stages.map((stage, index) => (
        <div key={index}>
          <button onClick={() => handleStageClick(stage)}>{stage}</button>
          {selectedStage === stage && (
            <div>
              {passages.map((passage, index) => (
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
