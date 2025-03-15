import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Rules.scss';

const languageOptions = [
  { option: 'A', label: 'English' },
  { option: 'ఆ', label: 'తెలుగు' },
  { option: 'उ', label: 'हिन्दी' }
];

const rulesList = {
  A: {
    T20: [
      { heading: 'Rule 1', description: 'T20 matches count only 6s.' },
      { heading: 'Rule 2', description: 'Super Over boundaries do not count.' }
    ],
    ODI: [
      { heading: 'Rule 1', description: 'ODI matches count 4s and 6s.' },
      { heading: 'Rule 2', description: 'Minimum 25 overs required for a valid match.' }
    ],
    Womens: [
      { heading: 'Rule 1', description: 'Women’s matches count 4s and 6s.' },
      { heading: 'Rule 2', description: 'Winning amount distributed within 10 minutes.' }
    ]
  },
  "ఆ": {
    T20: [
      { heading: 'నిబంధన 1', description: 'T20 మ్యాచ్ - కేవలం 6s మాత్రమే లెక్క చేయబడతాయి.' },
      { heading: 'నిబంధన 2', description: 'సూపర్ ఓవర్ బౌండరీలు లెక్కలోకి తీసుకోబడవు.' }
    ],
    ODI: [
      { heading: 'నిబంధన 1', description: '50 ఓవర్ల మ్యాచ్ - 4s + 6s కలిపి లెక్క చేయబడతాయి.' },
      { heading: 'నిబంధన 2', description: 'కనీసం 25 ఓవర్లు ఆడాలి.' }
    ],
    Womens: [
      { heading: 'నిబంధన 1', description: 'మహిళల మ్యాచ్ - 4s + 6s కలిపి లెక్క చేయబడతాయి.' },
      { heading: 'నిబంధన 2', description: 'విన్నింగ్ అమౌంట్ 10 నిమిషాల్లో ఇస్తారు.' }
    ]
  },
  "उ": {
    T20: [
      { heading: 'नियम 1', description: 'T20 मैच में केवल 6s गिने जाएंगे।' },
      { heading: 'नियम 2', description: 'सुपर ओवर में बाउंड्री नहीं गिनी जाएगी।' }
    ],
    ODI: [
      { heading: 'नियम 1', description: 'ODI मैच में 4s और 6s गिने जाएंगे।' },
      { heading: 'नियम 2', description: 'मैच मान्य होने के लिए कम से कम 25 ओवर होने चाहिए।' }
    ],
    Womens: [
      { heading: 'नियम 1', description: 'महिला मैच में 4s और 6s गिने जाएंगे।' },
      { heading: 'नियम 2', description: 'जीत की राशि 10 मिनट के भीतर वितरित की जाएगी।' }
    ]
  }
};

const Rules = () => {
  const [selectedButton, setSelectedButton] = useState('A');
  const [selectedTab, setSelectedTab] = useState('T20');

  return (
    <div className='rules-container'>
      <Header />
      <div className='rules'>
        <h1>Select Language:</h1>
        <div className='button-container'>
          {languageOptions.map((each) => (
            <div key={each.option} className='option-container'>
              <button
                className={`language-button ${selectedButton === each.option ? 'selected' : ''}`}
                onClick={() => setSelectedButton(each.option)}
              >
                {each.option}
              </button>
              <p className='option-label'>{each.label}</p>
            </div>
          ))}
        </div>

        <div className='tabs'>
          {['T20', 'ODI', 'Womens'].map((tab) => (
            <div
              key={tab}
              className={`tab ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className='rules-section'>
          {rulesList[selectedButton][selectedTab].map((rule, index) => (
            <div className='rule' key={index}>
              <h3 className='rule-heading'>{rule.heading}</h3>
              <p>{rule.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rules;
