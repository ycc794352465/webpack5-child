/**
 * 基本请求
 */
function request(url, data, type = 'post') {
    return fetch(url, {
        method: type,
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.status == 200) {
            return res.json()
        } else {
            throw new Error("请求失败");
        }
    })
}
/**
 * 
 * @param {*} data 
 * @returns 返回一个fetch请求
 */
function post(url, data) {
    return request(url, data, 'post')
}

function get(url, data) {
    return request(url, data, 'get')
}

export {
    post,
    get
}