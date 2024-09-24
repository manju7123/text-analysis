import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [replacedWords, setReplacedWords] = useState([]);

  // Calculate word and character count on every text change
  useEffect(() => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    setUniqueWordCount(new Set(words).size);
    const chars = text.replace(/[\s\W]/g, '');
    setCharCount(chars.length);
    setReplacedWords([]);
  }, [text]);

  // Handle string replacement and store replaced words
  const handleReplace = () => {
    if (searchString) {
      const regex = new RegExp(searchString, 'g');
      const updatedText = text.replaceAll(searchString, replaceString);
      setText(updatedText);
      const replaced = [...text.matchAll(regex)];
      setReplacedWords(replaced.map(match => match.index));
    }
  };

  // Function to highlight replaced words in the text
  const getHighlightedText = () => {
    const regex = new RegExp(searchString, 'g');
    return text.split(regex).map((part, index, array) => (
      <React.Fragment key={index}>
        {part}
        {index < array.length - 1 && (
          <span className="highlight">{replaceString}</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="app-container">
      <h1 className="heading">Real-Time Text Analysis and String Replacement</h1>
      
      {/* Textarea for user input */}
      <textarea
        className="input-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        rows={4} 
        cols={40}
      />
      
      {/* Display unique word count and character count */}
      <div className="stats-container">
        <p className="stat-item">Unique Words: {uniqueWordCount}</p>
        <p className="stat-item">Character Count (excluding spaces and punctuation): {charCount}</p>
      </div>

      {/* Section for string replacement inputs */}
      <div className="replace-section">
        <input
          type="text"
          className="replace-input"
          placeholder="String to replace"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <input
          type="text"
          className="replace-input"
          placeholder="Replacement string"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
        />
        <button className="replace-button" onClick={handleReplace}>Replace All</button>
      </div>

      {/* Display the highlighted text */}
      <div className="highlighted-text">
        {getHighlightedText()}
      </div>
    </div>
  );
};

export default App;
