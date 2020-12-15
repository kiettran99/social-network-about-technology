import axios from 'axios';

class AccountAPI {

    lockAcc =async(id)=>{
        return axios.put(`https://tlcn-social-network-api.herokuapp.com/api/users/look/${id}`).then(result=>{
            return result.data;
        }).catch(err=>{
            if (err) {
                console.log(err);
            }
        })
    }
   
}
export default AccountAPI;