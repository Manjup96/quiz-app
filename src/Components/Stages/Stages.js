// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../Styles/Stages.css';
// import passage1Img from '../Assets/images/img1.jpg';
// import passage2Img from '../Assets/images/img2.jpg';
// import passage3Img from '../Assets/images/img3.jpg';
// import passage4Img from '../Assets/images/img4.jpg';
// import passage5Img from '../Assets/images/img5.jpg';

// function Stages() {
//   const navigate = useNavigate();
//   const [selectedStage, setSelectedStage] = useState(null);
//   const [selectedPassage, setSelectedPassage] = useState(null);

//   const stages = ['stage0', 'stage1', 'stage2', 'stage3', 'stage4'];

//   const passages = {
//     'stage0': [
//       { name: 'passage1', img: passage1Img },
//       { name: 'passage2', img: passage2Img },
//       { name: 'passage3', img: passage3Img },
//       { name: 'passage4', img: passage4Img },
//       { name: 'passage5', img: passage5Img }
//     ],
//     'stage1': [
//       { name: 'passage1', img: passage1Img },
//       { name: 'passage2', img: passage2Img },
//       { name: 'passage3', img: passage3Img },
//       { name: 'passage4', img: passage4Img },
//       { name: 'passage5', img: passage5Img }
//     ],
//     // Add other stages with corresponding passages
//   };

//   const passageToPage = {
//     'passage1': 1,
//     'passage2': 2,
//     'passage3': 3,
//     'passage4': 4,
//     'passage5': 5,
//   };

//   const handleStageClick = (stage) => {
//     setSelectedStage(stage === selectedStage ? null : stage);
//     setSelectedPassage(null);
//   };

//   const handlePassageClick = (passageName, passageIndex) => {
//     if (passageIndex === 0) {
//       setSelectedPassage(passageName);
//       navigate('/website', { state: { passageIndex: passageToPage[passageName] } });
//     }
//   };

//   return (
//     <div className="card-container">
//       {stages.map((stage, index) => (
//         <div className="stage-container" key={index}>
//           <button className="stage-button" onClick={() => handleStageClick(stage)}>{stage}</button>
//           {selectedStage === stage && (
//             <div className="passage-structure">
//               <div className="passage-row">
//                 {passages[stage].map((passage, idx) => (
//                   <div
//                     className={`passage-item ${idx !== 0 ? 'inactive' : 'active'}`}
//                     key={idx}
//                     onClick={() => handlePassageClick(passage.name, idx)}
//                   >
//                     <img src={passage.img} alt={passage.name} />
//                     {idx < passages[stage].length - 1 && <div className="connection-line"></div>}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Stages;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Stages.css';
import passage1Img from '../Assets/images/img1.jpg';
import passage2Img from '../Assets/images/img2.jpg';
import passage3Img from '../Assets/images/img3.jpg';
import passage4Img from '../Assets/images/img4.jpg';
import passage5Img from '../Assets/images/img5.jpg';

function Stages() {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(null);

  const stages = ['Passage1', 'Passage2', 'Passage3', 'Passage4','Passage4'];

  const passages = {
    'Passage1': [
      { name: 'passage1', img: passage1Img },
      { name: 'passage2', img: passage2Img },
      { name: 'passage3', img: passage4Img },
      { name: 'passage4', img: passage3Img },
      { name: 'passage5', img: passage5Img },
      { name: 'passage6', img: passage4Img }
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

  

  const handleStageClick = (stage) => {
    setSelectedStage(stage === selectedStage ? null : stage);
    setSelectedPassage(null);
  };

  const handlePassageClick = (passageName, passageIndex) => {
    if (passageIndex === 0) {
      setSelectedPassage(passageName);
      navigate("/website");
    } 
    else if (passageIndex === 1) {
      setSelectedPassage(passageName);
      navigate("/Vocabulary");
    }
    else if (passageIndex === 2) {
      setSelectedPassage(passageName);
      navigate("/FillInTheBlank");
    }
    else if (passageIndex === 3) {
      setSelectedPassage(passageName);
      navigate("/Jumblewords");
    }
    else if (passageIndex === 4) {
      setSelectedPassage(passageName);
      navigate("/Spelling");
    }else if (passageIndex === 5) {
      setSelectedPassage(passageName);
      navigate("/Comprehension");
    }
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
                    className="passage-item"
                    key={idx}
                    onClick={() => handlePassageClick(passage.name, idx)}
                  >
                    <img src={passage.img} alt={passage.name} />
                    {idx < passages[stage].length - 1 && <div className="connection-line"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Stages;
