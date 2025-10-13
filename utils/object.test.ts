import { resolvePathWithQuery } from '@/shared/utils/object.utils'

type Produto = {
  id: number
  nome: string
  margens: Array<{ tipo: 'varejo' | 'atacado'; fator?: number }>
}

const produto: Produto = {
  id: 1,
  nome: 'exemplo',
  margens: [
    { tipo: 'varejo', fator: 1.5 },
    { tipo: 'atacado', fator: 1.2 },
  ],
}
describe('object utils', () => {
  test('deve retornar o valor esperado pelo caminho informado (path)', () => {
    const nome = resolvePathWithQuery(produto, 'nome')
    const id = resolvePathWithQuery(produto, 'id')
    const fatorVarejo = resolvePathWithQuery(produto, 'margens.[tipo=varejo].fator')
    const fatorAtacado = resolvePathWithQuery(produto, 'margens.[tipo=atacado].fator')
    expect(id).toBe(1)
    expect(nome).toBe('exemplo')
    expect(fatorVarejo).toBe(1.5)
    expect(fatorAtacado).toBe(1.2)
  })
  test('deve retornar o valor esperado pelo caminho informado (path) quando for array direto', () => {
    const margens = [
      { fruta: 'banana', preco: 50 },
      { fruta: 'maça', preco: 60 },
    ]
    const precoBanana = resolvePathWithQuery(margens, '[fruta=banana].preco')
    const precoMaca = resolvePathWithQuery(margens, '[fruta=maça].preco')
    expect(precoBanana).toBe(50)
    expect(precoMaca).toBe(60)
  })
})
