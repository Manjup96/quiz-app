import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Website = () => {
    const { user } = useAuth();
    console.log("User data:", user);

    // Default URL with placeholders for the user's name and uid
    const defaultUrl = 'http://127.0.0.1:5500/index.html';

    // Use the user's name and uid if available, otherwise fallback to 'user' and 'unknown'
    const userName = user?.name || 'user';
    const userId = user?.uid || 'unknown';
    console.log("userName=", userName);
    console.log("userId=", userId);

    const urlWithUserNameAndId = `${defaultUrl}?name=${encodeURIComponent(userName)}&uid=${encodeURIComponent(userId)}`;

    // For demonstration, you can use URL parameters if needed
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('src') || urlWithUserNameAndId; // Use URL parameter if available, otherwise default URL with user's name and uid

    return (
        <iframe
            src={url}
            title="Embedded Content"
            width="100%"
            height="725px"
            style={{ border: 'none' }}
        />
    );
};

export default Website;
