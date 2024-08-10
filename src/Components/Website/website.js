import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Website = () => {
    const { user } = useAuth();
    const location = useLocation();
    const passageIndex = location.state?.passageIndex || 1;

    const defaultUrl = 'http://127.0.0.1:5502/sample.html';
    const userName = user?.name || 'user';
    const userId = user?.uid || 'unknown';
    const urlWithUserNameAndId = `${defaultUrl}?name=${encodeURIComponent(userName)}&uid=${encodeURIComponent(userId)}`;

    useEffect(() => {
        const iframe = document.getElementById('embeddedContent');
        iframe.onload = () => {
            iframe.contentWindow.postMessage({ type: 'changePage', pageNumber: passageIndex }, '*');
        };
    }, [passageIndex]);

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

export default Website;
