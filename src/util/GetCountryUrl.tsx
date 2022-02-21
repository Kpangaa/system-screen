import { countries } from '../data';

export const GetCountryUrl = (countryId: any) => {
    if(countries.length === 1) {
        return countries.find(c => c.id === countryId)?.url
    } return '/' + countries.find(c => c.id === countryId)?.url
}; 