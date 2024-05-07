import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Test = () => {
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        console.log('user : ');
        var user = sessionStorage.getItem('user') ?? '';
        setImageUrl(user['foto_profile']);
        console.log('user : '. user);
    },[]);

    

    return (
        <div>
            <h1>Ini Image</h1>
            <h2>sdf</h2>
            {imageUrl && <img src={imageUrl} alt="Image" />}
        </div>
    );
}

export default Test;
