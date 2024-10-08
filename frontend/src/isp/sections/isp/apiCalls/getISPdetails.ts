import axios from "axios";
import { server_baseurl } from "../../../../baseUrl";
import Swal from "sweetalert2";
import { Shop } from "../../../../redux/activeISP";
import { NavigateFunction } from "react-router-dom";

    export const getISPdetailsApi = async(navigate: NavigateFunction): Promise<Shop[] | undefined> =>{

    const tokenString = sessionStorage.getItem("userToken");
    if (tokenString !== null) {
        var token = JSON.parse(tokenString);
    } else {
        navigate("/isp/login", {replace: true});
    }

    const data = JSON.stringify({addedBy: 38});

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${server_baseurl}/user/shop-details`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    };

    return await axios.request(config)
    .then((response) => {
        if(response.data.success){
           return response.data.details
        }else{
            Swal.fire({
                title: "Failed",
                text: `${response.data.msg}`,
                icon: "warning"
            });
        }
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            title: "Oooops...",
            text: `Server side error`,
            icon: "warning"
        });
    });   
}