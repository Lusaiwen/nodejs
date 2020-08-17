import axios from "axios"

export default function () {
    const token = localStorage.getItem("token");
    let instance = axios;
    //发送请求时，如果有token，则附带上token到请求头
    if (token) {
        instance = axios.create({
            headers: {
                authorization: "bearer " + token
            }
        })
    }

    axios.interceptors.response.use(resp => {
        //响应时，如果带有token，则添加到localstore
        if (resp.headers.authorization) {
            localStorage.setItem("token", resp.headers.authorization);
        }
        return resp;
    }, err => {
        //响应状态码为403（没有token，token过期），删除token
        if (err.response.status === 403) {
            localStorage.removeItem("token");
        }
        return Promise.reject(err);
    })
    return instance;
}