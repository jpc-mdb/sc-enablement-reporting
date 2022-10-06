import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import date from 'date-and-time';

function PreworkStartedReport({token}) {
    const [users, setUsers] = useState([]);
    const [newUsers, setNewUsers] = useState([]);
    const access_token = token;
    const [userCount, setUserCount] = useState('');
    const old_prework_cutoff_date = new Date(2022, 9, 6);
    const new_prework_cutoff_date = new Date(2022, 9, 19);
    const [old_prework_series, setOldPreworkSeries] = useState('');
    const [new_prework_series, setNewPreworkSeries] = useState('');
    const old_prework_series_id = '1311384894896850668';
    const new_prework_series_id = '1569665944381283388';

    useEffect(() => {
        async function getUsers(){
            const instance = axios.create({
                baseURL: 'https://api.mindtickle.com',
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            });

            await instance.post('/services/data/v2.0/mtobjects/Users', {
                groupIds: ['1567530678712286549']
            })
            .catch(function(error) {
                console.log(error); 
            })
            .then(response => {
                setUsers(response.data.users);         
                setUserCount(response.data.totalSize);   
                
                // var tempUsers = [];
                // for(var user in users){
                //     console.log(user);
                //     var userDetail = {
                //         id: user.id,
                //         name: user.name,
                //         start_date: user.profile.a_21,
                //         series_assigned: user.seriesEnitiies
                //     }

                //     tempUsers.push(userDetail);
                // }

                // setNewUsers(tempUsers);
                // console.log(newUsers);
                // console.log(users.length);
                // console.log(tempUsers.length);
            })
        }

        // async function getAssignedModules(users) {
        //     const instance = axios.create({
        //         baseURL: 'https://api.mindtickle.com',
        //         headers: {
        //             Authorization: 'Bearer ' + access_token
        //         }
        //     });

        //     for(var user in users){
        //         await instance.get('services/data/v2.0/mtobjects/User/' + user.id)
        //         .catch(function(error) {
        //             console.log(error);
        //         })
        //         .then(response => {
        //             var userDetail = new Object(){
        //                 id = user.id,
        //                 name = user.name,
        //                 start_date = user.profile.a_21
        //             }            
        //         })
        //     }            
        // }

        if(users.length === 0) {
            getUsers();
        }
    })

    function getPreworkDuration(user){
        const start_date = date.parse(user.profile.a_21.replace(',', ''), 'D MMM YYYY HH:mm');
        var isValid = date.isValid(start_date, 'D MMM YYYY HH:mm');
        const now = new Date();
        const diff = date.subtract(now, start_date).toDays();

        if (isValid && start_date) {
            return Math.round(diff);
        }
    }

    return (
        <div>
            <p>Users count in response: {users.length}</p>
            <p>Users returned in API: {userCount}</p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>{user.name}</p>
                        <p>Added to Mindtickle on: {user.profile.a_21}</p>
                        <p>Started Prework {getPreworkDuration(user)} days ago</p>
                        <p>{user.seriesEntities}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PreworkStartedReport;