import { config } from "./config";
import axios from 'axios';

const activitiesRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.ACTIVITY}`;

export function getActivities(token){
	return axios({
		method: 'get',
		url : activitiesRoute,
		headers: { 'Authorization': token},
		params: {
			'amount_to_return': 10000
		}
	})
}
