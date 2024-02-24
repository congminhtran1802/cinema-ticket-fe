import Axios from "axios"
import {DOMAIN,DOMAIN2,TOKEN} from '../util/settings/config'

export class baseService {
    //put json về phía backend
    put = (url,model) => {
        return  Axios({
            url:`${DOMAIN}${url}`,
            method:'PUT',
            data:model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT
        }) 
    }

    post = (url,model) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'POST',
            data:model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //JWT
        }) 
    }


    get = (url) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }

    delete = (url) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'DELETE',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)} //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }

    get2 = async (url) => {
        try {
          const response = await fetch(`${DOMAIN2}${url}`, {
            method: 'GET',
          });
      
          console.log('Response:', response);
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const jsonData = await response.json();
          console.log('Data:', jsonData);
      
          return jsonData;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
    }

    put2 = async (url,model) => {
        try {
          const response = await fetch(`${DOMAIN2}${url}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(model),
          });
      
          console.log('Response:', response);
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const jsonData = await response.json();
          console.log('Data:', jsonData);
      
          return jsonData;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
    }
      
}