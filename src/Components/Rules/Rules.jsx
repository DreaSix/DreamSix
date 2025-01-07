import { BookOutlined, DollarCircleOutlined, HomeOutlined, TeamOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Rules.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const languageOptions = [
  {
      option: "A",
      label: "English"
  },
  {
      option: "ఆ",
      label: "తెలుగు"
  },
  {
      option: "उ",
      label: "हिन्दी"
  }
];

const rulesList = {
  A: [
    {
      heading: "Rule 1",
      description: "All players and participants must demonstrate respect for the game, its rules, and fellow competitors."
    },
    {
      heading: "Rule 2",
      description: "All players must engage in fair play and maintain the spirit of the game, avoiding any form of cheating or unsportsmanlike behavior."
    },
    {
      heading: "Rule 3",
      description: "Ensure that all safety protocols are followed to protect the players and officials during the game."
    },
    {
      heading: "Rule 4",
      description: "All participants must adhere to the scheduled timings and be punctual to avoid delays in the tournament."
    },
    {
      heading: "Rule 3",
      description: "Ensure that all safety protocols are followed to protect the players and officials during the game."
    },
    {
      heading: "Rule 4",
      description: "All participants must adhere to the scheduled timings and be punctual to avoid delays in the tournament."
    },
    {
      heading: "Rule 5",
      description: "Ensure that all safety protocols are followed to protect the players and officials during the game."
    },
    {
      heading: "Rule 6",
      description: "All participants must adhere to the scheduled timings and be punctual to avoid delays in the tournament."
    }
  ],

  "ఆ": [
    {
      heading: "నిబంధన 1",
      description: "అన్నీ ఆటగాళ్లు మరియు పాల్గొనే వారు ఆట, దాని నిబంధనలు మరియు ఇతర పోటీదారుల పట్ల గౌరవాన్ని ప్రదర్శించాలి."
    },
    {
      heading: "నిబంధన 2",
      description: "అన్నీ ఆటగాళ్లు సమర్థమైన ఆటలో పాల్గొని, కాదనే లేకుండా ఆట యొక్క ఆత్మను నిర్వహించాలి."
    },
    {
      heading: "నిబంధన 3",
      description: "ఆట సమయంలో ఆటగాళ్లను మరియు అధికారులను రక్షించడానికి అన్ని భద్రతా ప్రోటోకాల్స్ పాటించాలి."
    },
    {
      heading: "నిబంధన 4",
      description: "అన్నీ పాల్గొనే వారు నిశ్చితమైన సమయాలను పాటించాలి మరియు పోటీకి ఆలస్యమైన దూరం ఉండటానికి నిశ్చితంగా ఉండాలి."
    },
    {
      heading: "నిబంధన 5",
      description: "అన్నీ ఆటగాళ్లు మరియు పాల్గొనే వారు ఆట, దాని నిబంధనలు మరియు ఇతర పోటీదారుల పట్ల గౌరవాన్ని ప్రదర్శించాలి."
    },
    {
      heading: "నిబంధన 6",
      description: "అన్నీ ఆటగాళ్లు సమర్థమైన ఆటలో పాల్గొని, కాదనే లేకుండా ఆట యొక్క ఆత్మను నిర్వహించాలి."
    },
  ],


  "उ": [
    {
      heading: "नियम 1",
      description: "सभी खिलाड़ियों और प्रतिभागियों को खेल, उसके नियमों और अन्य प्रतियोगियों के प्रति सम्मान दिखाना चाहिए।"
    },
    {
      heading: "नियम 2",
      description: "सभी खिलाड़ियों को खेल की आत्मा को बनाए रखते हुए खेल में उचित खेल में भाग लेना चाहिए।"
    },
    {
      heading: "नियम 3",
      description: "खेल के दौरान खिलाड़ियों और अधिकारियों की सुरक्षा सुनिश्चित करने के लिए सभी सुरक्षा प्रोटोकॉल का पालन करना चाहिए।"
    },
    {
      heading: "नियम 4",
      description: "सभी प्रतिभागियों को निर्धारित समय का पालन करना चाहिए और प्रतियोगिता में देरी से बचने के लिए समय पर पहुँचना चाहिए।"
    },
    {
      heading: "नियम 5",
      description: "सभी खिलाड़ियों और प्रतिभागियों को खेल, उसके नियमों और अन्य प्रतियोगियों के प्रति सम्मान दिखाना चाहिए।"
    },
    {
      heading: "नियम 6",
      description: "सभी खिलाड़ियों को खेल की आत्मा को बनाए रखते हुए खेल में उचित खेल में भाग लेना चाहिए।"
    },
  ]
};


const Rules = () => {
  const [selectedButton, setSelectedButton] = useState("A");
  const [selectedTab, setSelectedTab] = useState("T20");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <main>
    <div className='rules-container'>
      <div className='rules'>
      <div>
        <h1>Select Languages:</h1>
      </div>

      <div className="button-container">
        {languageOptions.map((each) => (
          <div className='option-container'>
          <button
            key={each?.option}
            className={`language-button ${selectedButton === each?.option ? 'selected' : ''}`}
            onClick={() => handleButtonClick(each?.option)}
          >
            {each?.option}
          </button>
          <p className='option-label'>{each?.label}</p>
          </div>
        ))}
      </div>

      <div className="tabs">
        <div className={`tab ${selectedTab === 'T20' ? 'active' : ''}`} onClick={() => handleTabClick('T20')}>T20</div>
        <div className={`tab ${selectedTab === 'ODI' ? 'active' : ''}`} onClick={() => handleTabClick('ODI')}>ODI</div>
        <div className={`tab ${selectedTab === 'Womens' ? 'active' : ''}`} onClick={() => handleTabClick('Womens')}>Women's</div>
      </div>

      <div className="rules-section">
        {rulesList[selectedButton].map((rule, index) => (
          <div className="rule" key={index}>
            <h3 className='rule-heading'>{rule.heading}</h3>
            <p>{rule.description}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
    </main>
  );
};

export default Rules;
