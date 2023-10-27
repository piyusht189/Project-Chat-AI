// BardTextInput.js

import React, { useState } from 'react';
import styles from './BardTextInput.css';
import SendIcon from '@mui/icons-material/Send';
import userIcon from '../../../assets/images/icons/avatar.png'; // with import  
import botIcon from '../../../assets/images/logo.png'; // with import  
import AIWriter from 'react-aiwriter';



const ChatList = ({ chatData }) => {
    return (
        <div style={{overflowY: 'scroll', marginBottom: 60, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, padding: 10 }}>
            {
                chatData.map((chatObject, index) => {
                    if (chatObject.who == "u") {
                        return (<div key={chatObject.who + index} style={{ display: 'flex', marginTop: 55, marginBottom: 15, paddingLeft: 25 }}>
                            <img src={userIcon} alt="User" style={{ width: 40, height: 40 }}></img>
                            <p style={{ marginLeft: 20, marginTop: 'auto', marginBottom: 'auto', lineHeight: "21px" }}>{chatObject.message}</p>
                        </div>)
                    } else {
                        return (
                            <div key={chatObject.who + index} style={{ display: 'flex', marginTop: 25, marginBottom: 15, background: "white", padding: 25, borderRadius: 25 }}>
                                <img src={botIcon} alt="User" style={{ width: 40, height: 40 }}></img>
                                <p style={{ marginLeft: 20, marginTop: 'auto', marginBottom: 'auto', lineHeight: "21px" }}>
                                {chatObject.message}
                                </p>
                            </div>
                        )
                    }
                })
            }
             <div style={{ display: 'flex', marginTop: 25, marginBottom: 15, background: "white", padding: 25, borderRadius: 25 }}>
                                <img src={botIcon} alt="User" style={{ width: 40, height: 40 }}></img>
                                <p style={{ marginLeft: 20, marginTop: 'auto', marginBottom: 'auto', lineHeight: "21px" }}>
                                    <AIWriter delay={100}>{chatData[1].message}</AIWriter>
                                
                                </p>
                            </div>

        </div>
    );
};

export default ChatList;
