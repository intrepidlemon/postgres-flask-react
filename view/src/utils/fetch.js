import axios from 'axios'

export const fetch = axios.create({
  headers: {
    "cache-control": "no-store",
    "pragma": "no-cache",
  },
  withAuthorization: true,
  validateStatus: status => true, // make more similar to fetch
})

export const GET = params => fetch({ method: "get", ...params })
export const POST = params => fetch({ method: "post", ...params })
export const PUT = params => fetch({ method: "put", ...params })
export const PATCH = params => fetch({ method: "patch", ...params })
export const DELETE = params => fetch({ method: "delete", ...params })

