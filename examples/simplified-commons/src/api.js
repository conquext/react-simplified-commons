import axios from 'axios'

export const baseURL =
  process.env.BASE_URL || 'https://rewarddemo.herokuapp.com'

export const makeApiCall = axiosConfigObj => {
  const config = {
    ...axiosConfigObj,
    baseURL,
  }
  return new Promise((resolve, reject) => {
    return axios(config)
      .then(({ data }) => {
        return resolve(data)
      })
      .catch(err => {
        return reject(err)
      })
  })
}

export const inviteUser = data => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `/sendinvite`
      let resp = null
      resp = await makeApiCall({
        url,
        headers: { Authorization: `` },
        method: 'post',
        data,
      })
      return resolve(resp)
    } catch (error) {
      return reject(error)
    }
  })
}

export const deleteUser = data => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `/staffs/${data.email}`
      let resp = null
      resp = await makeApiCall({
        url,
        headers: { Authorization: `` },
        method: 'delete',
        data,
      })
      return resolve(resp)
    } catch (error) {
      return reject(error)
    }
  })
}

export const getUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `/staffs`
      let resp = null
      resp = await makeApiCall({
        url,
        headers: { Authorization: `` },
        method: 'get',
      })
      return resolve(resp)
    } catch (error) {
      return reject(error)
    }
  })
}
