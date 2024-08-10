import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Vocabulary = () => {
    const { user } = useAuth();
    const location = useLocation();
    const passageIndex = location.state?.passageIndex || 1;

    const defaultUrl = 'http://127.0.0.1:5502/Vocabulary.html';
    const userName = user?.name || 'user';
    const userId = user?.uid || 'unknown';
    const urlWithUserNameAndId = `${defaultUrl}?name=${encodeURIComponent(userName)}&uid=${encodeURIComponent(userId)}`;

    useEffect(() => {
        // Store userName and userId in localStorage
        localStorage.setItem('userName', userName);
        localStorage.setItem('userId', userId);

        const iframe = document.getElementById('embeddedContent');
        iframe.onload = () => {
            iframe.contentWindow.postMessage({ type: 'changePage', pageNumber: passageIndex }, '*');
        };
    }, [userName, userId, passageIndex]);

    return (
        <iframe
            id="embeddedContent"
            src={urlWithUserNameAndId}
            title="Embedded Content"
            width="100%"
            height="800px"
            style={{ border: 'none' }}
        />
    );
};

export default Vocabulary;
