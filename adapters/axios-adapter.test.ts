import axios, { type AxiosInstance } from 'axios'

import { AxiosAdapter } from './axios-adapter'

const api: AxiosInstance = axios.create()
const adapter: AxiosAdapter = new AxiosAdapter(api)

describe('AxiosAdapter', () => {
  const body = { data: 'test' }

  it('Deve realizar uma HTTP request do tipo GET', async () => {
    const response = await adapter.get('/')
    expect(response).toBeTruthy()
  })

  it('Deve realizar uma HTTP request do tipo POST', async () => {
    const response = await adapter.post('/', body)
    expect(response).toBeTruthy()
  })

  it('Deve realizar uma HTTP request do tipo DELETE', async () => {
    const response = await adapter.delete('/:id')
    expect(response).toBeTruthy()
  })

  it('Deve realizar uma HTTP request do tipo PUT', async () => {
    const response = await adapter.put('/:id', body)
    expect(response).toBeTruthy()
  })

  it('Deve realizar uma HTTP request do tipo PATCH', async () => {
    const response = await adapter.patch('/:id', body)
    expect(response).toBeTruthy()
  })
})
