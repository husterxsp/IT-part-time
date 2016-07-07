import axios from 'axios';
const host = '//localhost:3000/api';

export default function apis({
    url,
    method,
    ...others
}) {
    return axios({
        url: host + url,
        method: method,
        ...others
    });
}
