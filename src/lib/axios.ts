import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL
})

if (env.NEXT_PUBLIC_API_URL) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 4000)),
    )

    return config
  })
}
