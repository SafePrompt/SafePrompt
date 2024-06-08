import axios from 'axios';

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

    }catch(error){

    }

}