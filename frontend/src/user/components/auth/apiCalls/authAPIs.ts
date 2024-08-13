import axios from "axios";
import Swal from "sweetalert2";
import { server_baseurl } from "../../../../baseUrl";
import { UserDetails } from "../../../../redux/userDetails";

interface SignupUserParams {
    success: boolean;
    details: {msg: string, token: string; details: UserDetails[]};  
}

export const signupUser = async(data: string): Promise<SignupUserParams> =>{
    return await makeApiCall(`user/signup`, 'post', data);
};
export const loginUserAPI = async(data: string): Promise<SignupUserParams> =>{
    return await makeApiCall(`user/login`, 'post', data);
};


const makeApiCall = async(url: string, method: string, data: string) =>{

    let config = {
        method: method,
        maxBodyLength: Infinity,
        url: `${server_baseurl}/${url}`,
        headers: { 
            'Content-Type': 'application/json',
        },
        data : data
    };

    return await axios.request(config)
    .then((response) => {
        if(response.data.success){
            console.log(response.data)
            return {success: true, details: response.data};
        }else{
            Swal.fire({
                text: `${response.data.msg}`,
                showCloseButton: true,
                showConfirmButton: false,
                animation: false,
                color: "#dc3545",
                padding: "5px"
            });
            return {success: false, details: {msg: '', token: '', details: [{user_id: '',
                first_name: '', last_name: ''}]}};
        };
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            text: `${error.response.data?.msg || `Server Side Error`}`,
            showCloseButton: true,
            showConfirmButton: false,
            animation: false,
            color: "#dc3545",
            padding: "0px 0px 10px 0px"
        })
        return {success: false, details: {msg: '', token: '', details: [{user_id: '',
            first_name: '', last_name: '' }]} };
    });
};