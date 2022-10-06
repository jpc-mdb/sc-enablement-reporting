import React, { useState } from "react";
import AccessToken from "../Components/AccessToken";
import PreworkStartedReport from "../Components/PreworkStartedReport";

function Home(){
    const [access_token, setToken] = useState('');
    
    return (
        <>
            <h1>Hello world!</h1>
            <AccessToken token={val => setToken(val)} />
            { access_token !== '' ? <PreworkStartedReport token={access_token} /> : <></> }
        </>
    )
}

export default Home;