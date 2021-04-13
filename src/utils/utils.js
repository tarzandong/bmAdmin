

export default {
  lsAvailable(){
    let userInfo=localStorage.getItem('userInfo')
    if (!userInfo) return false
    else {
      userInfo=JSON.parse(userInfo)
      console.log(userInfo)
      if (!userInfo.token) return false
      else {
        // console.log((Date.now()-userInfo.logTime)/6000)
        if ((Date.now()-userInfo.logTime)/6000>userInfo.restMinutes) return false
        else return true
      }
    }
  }
}