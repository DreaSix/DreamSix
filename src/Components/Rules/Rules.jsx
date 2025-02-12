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
      heading: "నిబంధన 0",
      description: " పాటలో చెప్పిన ఆటగాళ్లలో ఎక్కువ 6s కొట్టినవాడు విజేత."
    },
    {
      heading: "నిబంధన 1",
      description: "T20 మ్యాచ్ - కేవలం 6s మాత్రమే లెక్క చేయబడతాయి."
    },
    {
      heading: "నిబంధన 2",
      description: "50 ఓవర్ల మ్యాచ్ - 4s + 6s కలిపి లెక్క చేయబడతాయి."
    },
    {
      heading: "నిబంధన 3",
      description: "మహిళల మ్యాచ్ - 4s + 6s కలిపి లెక్క చేయబడతాయి."
    },
    {
      heading: "నిబంధన 4",
      description: "సూపర్ ఓవర్ - కొట్టిన బౌండరీలు లెక్కలోకి తీసుకోబడవు."
    },
    {
      heading: "నిబంధన 5",
      description: "ప్లేయర్ ఒక బంతి కూడా ఆడకపోతే లేదా రిటైర్డ్ అయితే అమౌంట్ రిఫండ్ అవుతుంది."
    },
    {
      heading: "నిబంధన 6",
      description: "రిటైర్డ్ అయిన ప్లేయర్ ఎక్కువ బౌండరీలు కొట్టినా లెక్కలోకి తీసుకోబడవు."
    },
    {
      heading: "నిబంధన 7",
      description: "రిటైర్డ్ అయిన ప్లేయర్ మళ్లీ వచ్చి ఆడితే కౌంట్‌లోకి తీసుకుంటారు."
    },
    {
      heading: "నిబంధన 8",
      description: "పాటలో చెప్పిన ఆటగాడు కాకుండా వేరే ఆటగాడు బౌండరీ కొడితే లెక్కలోకి తీసుకోబడదు."
    },
    {
      heading: "నిబంధన 9",
      description: "విన్నింగ్ అమౌంట్ మ్యాచ్ పూర్తైన 10 నిమిషాల లోపు ఇస్తారు."
    },
    {
      heading: "నిబంధన 10",
      description: "వర్షం కారణంగా ఓవర్లు తగ్గితే: T20 - కనీసం 10 ఓవర్లు ఆడాలి. 50 ఓవర్లు మ్యాచ్ - కనీసం 25 ఓవర్లు ఆడాలి. ఈ కంటే తక్కువ ఓవర్లు ఆడితే పాట క్యాన్సిల్."
    },
    {
      heading: "నిబంధన 11",
      description: "100 కి కమీషన్ కేవలం 10%"
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
    <div className='rules-container'>

      <Header/>
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
      <Footer/>
    </div>
  );
};

export default Rules;
