import queryString from 'query-string';
export class Utils {

    static queryUrl = (target: string) => {
        const parsed = queryString.parse(location.search);
        return parsed[target]
    }
}