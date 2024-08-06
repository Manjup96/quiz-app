// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';
// import '../../Styles/Stages.css';

// const Stages = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [selectedStage, setSelectedStage] = useState(null);
//   const [selectedPassage, setSelectedPassage] = useState(null);

//   const stages = ['stage0', 'stage1', 'stage2', 'stage3', 'stage4'];
//   const passages = {
//     'stage0': ['passage1', 'passage2', 'passage3', 'passage4', 'passage5'],
//     'stage1': ['passage1', 'passage2', 'passage3', 'passage4', 'passage5'],
//     // Add other stages with corresponding passages
//   };

//   const passageToPage = {
//     'passage1': 1,
//     'passage2': 2,
//     'passage3': 3,
//     'passage4': 4,
//     'passage5': 5,
//   };

//   const passageUrl = 'http://127.0.0.1:5500/index.html';

//   const handleStageClick = (stage) => {
//     setSelectedStage(stage === selectedStage ? null : stage);
//     setSelectedPassage(null);
//   };

//   const handlePassageClick = (passage) => {
//     setSelectedPassage(passage);
//     const pageNumber = passageToPage[passage];
//     const userName = user?.name || 'user';
//     const userId = user?.uid || 'unknown';
//     const url = `${passageUrl}?page=${pageNumber}&name=${encodeURIComponent(userName)}&uid=${encodeURIComponent(userId)}`;
//     navigate(`/website?src=${encodeURIComponent(url)}`);
//   };

//   return (
//     <div className="card-container">
//       {stages.map((stage, index) => (
//         <div className="stage-container" key={index}>
//           <button className="stage-button" onClick={() => handleStageClick(stage)}>{stage}</button>
//           {selectedStage === stage && (
//             <div>
//               {passages[stage].map((passage, index) => (
//                 <div key={index}>
//                   <button className="passage-button" onClick={() => handlePassageClick(passage)}>{passage}</button>
//                   <div className="bar">
//                     <div className="filled-bar" style={{ width: `${(index + 1) * 20}%` }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stages;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../../Styles/Stages.css';
import passage1Img from '../Assets/images/img1.jpg';
import passage2Img from '../Assets/images/img2.jpg';
import passage3Img from '../Assets/images/img3.jpg';
import passage4Img from '../Assets/images/img4.jpg';
import passage5Img from '../Assets/images/img6.jpg';

const Stages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);

  const stages = ['stage0', 'stage1', 'stage2', 'stage3', 'stage4'];
  const passages = {
    'stage0': [
      { name: 'passage1', img: passage1Img },
      { name: 'passage2', img: passage2Img },
      { name: 'passage3', img: passage3Img },
      { name: 'passage4', img: passage4Img },
      { name: 'passage5', img: passage5Img }
    ],
    'stage1': [
      { name: 'passage1', img: passage1Img },
      { name: 'passage2', img: passage2Img },
      { name: 'passage3', img: passage3Img },
      { name: 'passage4', img: passage4Img },
      { name: 'passage5', img: passage5Img }
    ],
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
  };

  const handlePassageClick = (passage) => {
    const pageNumber = passageToPage[passage.name];
    const userName = user?.name || 'user';
    const userId = user?.uid || 'unknown';
    const url = `${passageUrl}?page=${pageNumber}&name=${encodeURIComponent(userName)}&uid=${encodeURIComponent(userId)}`;
    navigate(`/website?src=${encodeURIComponent(url)}`);
  };

  return (
    <div className="card-container">
      {stages.map((stage, index) => (
        <div className="stage-container" key={index}>
          <button className="stage-button" onClick={() => handleStageClick(stage)}>
            {stage}
          </button>
          {selectedStage === stage && (
            <div className="passage-structure">
              <div className="passage-row">
                {passages[stage].map((passage, index) => (
                  <div className="passage-item" key={index} onClick={() => handlePassageClick(passage)}>
                    <img src={passage.img} alt={passage.name} />
                    {index < passages[stage].length - 1 && <div className="connection-line"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stages;
