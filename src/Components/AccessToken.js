import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';

export default function AccessToken({token}){
    const [access_token, setToken] = useState('');

    useEffect(() => {
        async function getToken(){
            const instance = axios.create({
                baseURL: 'https://api.mindtickle.com'
            });

            await instance.post('/services/data/auth_token', {
                api_key: '30c977b0a14097720fb6ae0d6d935f1d8178677c',
                secret_key: '6240d0a6d76ac4f2c51301beb93ac78691b2b9efd018c85518de33b1260ce7a1b75aabfeeb511acc6575cdc8e6f3fb33',
                ls_url: 'mongodb.mindtickle.com'
            })
            .catch(function(error) {
                console.log(error);
            })
            .then(response => {
                setToken(response.data.token);   
                token(response.data.token);             
            })
        }

        if(access_token === '') {
            getToken();
        }
    })

    return (
        <></>
    )
}