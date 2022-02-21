import axios from "axios";
// import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const instance = axios.create({
	baseURL : process.env.REACT_APP_API
});

// instance.interceptors.request.use(
// 	async (config: any) => {
//         let cookies = new Cookies();
// 		const token = cookies.get('userAccessToken')
// 		const countryId = parseInt(cookies.get('countryId'))
// 		const channelId = parseInt(cookies.get('channelId'))
// 		if (token) {
// 			config.headers['Authorization'] = token
// 		}
// 		if (countryId) {
// 			config.headers['CountryId'] = countryId
// 		}
// 		if (channelId) {
// 			config.headers['ChannelId'] = channelId
// 		}
// 		return config
// 	}
// )

// instance.interceptors.response.use( 
// 	function (response: any) {
// 		return Promise.resolve(response)
// 	},
// 	function (error: any) {
// 		if (error.response && error.response.status === 401) {
// 			let cookies = new Cookies();
// 			cookies.remove('userAccessToken');

// 			const navigate = useNavigate();
// 			navigate('/');
// 		}
//         return Promise.reject(error);
//     }
// )

export default instance;