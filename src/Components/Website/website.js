import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Website = () => {
    const { user } = useAuth();
    console.log("User data:", user);

    // Default URL with a placeholder for the user's name
    const defaultUrl = 'http://127.0.0.1:5500/index.html?name=';

    // Use the user's name if available, otherwise fallback to 'user'
    const userName = user?.uid || 'user';
    console.log("userName=",userName)
    const urlWithUserName = `${defaultUrl}${encodeURIComponent(userName)}`;

    // For demonstration, you can use URL parameters if needed
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const url = queryParams.get('src') || urlWithUserName; // Use URL parameter if available, otherwise default URL with user's name

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
