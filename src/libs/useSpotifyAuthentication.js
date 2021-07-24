import { useState, useEffect } from "react"

export const useSpotifyAuthentication = () => {
  const [authenticationInfo, setAuthenticationInfo] = useState([
    { isAuthenticated: false },
  ])

  useEffect(() => {
    if (window.location.hash) {
      const nextAuthenticationInfo = {
        isAuthenticated: true,
        ...getReturnedParams(window.location.hash),
      }
      setAuthenticationInfo(nextAuthenticationInfo)
    }
  }, [])

  return authenticationInfo
}

const getReturnedParams = url => {
  const params = url.substr(1).split("&")
  let paramsObj = {}
  params.forEach(param => {
    const [key, value] = param.split("=")
    paramsObj = { ...paramsObj, [key]: value }
  })
  return paramsObj
}
