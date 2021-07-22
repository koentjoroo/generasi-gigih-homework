const getReturnedParams = url => {
    const params = url.substr(1).split('&')
    let paramsObj = {}
    params.forEach(param => {
        const [key, value] = param.split('=')
        paramsObj = { ...paramsObj, [key]: value }
    })
    return paramsObj
}

export default getReturnedParams