import axios from "axios";
import { server_baseurl } from "../../../../baseUrl";

export const processKillApi = () =>{
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/process/kill`,
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    axios.request(config)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });   
}