// BardTextInput.js

import React, { useState } from 'react';
import styles from './BardTextInput.css';
import SendIcon from '@mui/icons-material/Send';

const ChatComponent = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [textInputHeight, setTextInputHeight] = useState(52);
  const [borderColorInput, setborderColorInput] = useState("#ccc");

  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value);

  // Increase the text input height as the user types.
  const newTextInputHeight = event.target.scrollHeight;

  if(newTextInputHeight > 52){
    setTextInputHeight(newTextInputHeight);
  }

  // If the text input value is empty, reset the text input height to the initial height.
  if (event.target.value === '') {
    setTextInputHeight(52);
  }
  };

  const handleSubmit = () => {
    // Submit the user's input to a database or local storage.
  };

  return (
    <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row'
      }}>
      <textarea
        value={textInputValue}
        onChange={handleTextInputChange}
        onFocus={() => {
            setborderColorInput("#623cb1")
        }}
        onBlur={() => {
            setborderColorInput("#ccc")
        }}
        placeholder='Enter a prompt here'
        style={{  width: "100%",
            borderColor: borderColorInput,
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderRadius: 25,
            outline: 'none',
            paddingTop: 15,
            paddingBottom: 15,
            marginRight: 15,
            paddingLeft: 15,
            paddingRight: 15,
            fontFamily: 'Inter',
            fontSize: '1.05em',
            overflow: 'hidden',
            resize: "none", height: textInputHeight }}
      />
      <SendIcon  style={{fontSize: '2em',
  color: "#623cb1",
  cursor: "pointer"}}></SendIcon>
    </div>
  );
};

export default ChatComponent;
