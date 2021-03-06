
export enum ResponseCode {
    OK= 0,
    Fail= 1,
}

const parseJSON = (response: any) => {
    if (response.status === 204 || response.status === 401) {
        return { status: response.status };
    }
    return response.json();
}

const checkStatus = (response: any) => {
    if (response.ok) {
        return response;
    }
    if (response.status === 401){
        // LoginTools.logOut();
        console.log("login timeout")
    }

    const error = new Error(response.statusText);
    error.message = response;
    throw error;
}

const request = (url: string, options: any) => {
    const BaseUrl = "/AnyHealth/"
    const requestUrl = `${BaseUrl}${url}`;
    console.log(requestUrl + "\n")
    console.log(options.body + "\n")

    const token = ""
    // (global.DoctorProfile.Token ? global.DoctorProfile.Token : '')
    return fetch(requestUrl, Object.assign({}, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }, options))
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            return data;
        })
        .catch(err => {
            throw err
        });
}

const post = (url: string, param = {}) => request(url, {
    body: JSON.stringify(param),
    method: "POST",
})

export const sendRequest = (api: string, param: object, success: (data: any, msg?: string) => void, fail?: (errCode: ResponseCode, errMsg: string) => void) => {
    post(api, param).then((response) => {
        if (response.code === ResponseCode.OK) {
            success && success(response.data, response.msg)
        } else {
            console.log("request fail: ", response.code, response.msg)
            fail && fail(response.code, response.msg)
        }
    })
        .catch((error) => {
            fail && fail(ResponseCode.Fail, error.toString())
        })
}