import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

export default function RouteProtection(){


    const [permission, setPermission] = useState<boolean | null>(null)


    useEffect(()=>{
        async function checkToken(){

            try{
        
                const requestOptions = {
                    method: 'get',
                    url: 'http://localhost:3000/checkToken',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                };
        
                const response = await axios(requestOptions);
        
                if (response.status === 200) setPermission(true)
                else setPermission(false)
        
            }catch(error){
                setPermission(false)
                }
        
            }
        }, []

    )

    if (permission === null) {
        // Permission is still loading
        return <div>Loading...</div>;
    } else {
        // Permission is loaded, render based on its value
        return permission ? <Outlet /> : <Navigate to='/login' />;
    }

}