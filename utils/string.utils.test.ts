import { describe, expect, it } from 'vitest'

import { getIniciaisPrimeiroUltimoNome, getPrimeiroUltimoNome, StringUtils } from '@/shared/utils/string.utils'

describe('getIniciaisPrimeiroUltimoNome', () => {
  it('deve retornar uma string vazia se o nome completo não for fornecido', () => {
    expect(getIniciaisPrimeiroUltimoNome()).toBe('')
  })
  it('deve retornar a inicial do primeiro nome quando houver apenas o primeiro nome', () => {
    expect(getIniciaisPrimeiroUltimoNome('João')).toBe('J')
  })
  it('deve retornar as iniciais do primeiro e do último nome', () => {
    expect(getIniciaisPrimeiroUltimoNome('João Silva')).toBe('JS')
  })
  it('deve retornar as iniciais do primeiro e do último nome, ignorando nomes do meio', () => {
    expect(getIniciaisPrimeiroUltimoNome('João Maria Silva')).toBe('JS')
  })
  it('deve retornar as iniciais do primeiro e do último nome, ignorando espaços adicionais', () => {
    expect(getIniciaisPrimeiroUltimoNome('  João   Maria    Silva  ')).toBe('JS')
  })
  it('deve retornar a inicial do último nome quando houver apenas o último nome', () => {
    expect(getIniciaisPrimeiroUltimoNome('Silva')).toBe('S')
  })
  it('deve retornar as iniciais corretamente, mesmo com caracteres especiais no nome', () => {
    expect(getIniciaisPrimeiroUltimoNome('João Pérez Silva')).toBe('JS')
  })
  it('deve retornar uma string vazia se o nome completo contiver apenas espaços', () => {
    expect(getIniciaisPrimeiroUltimoNome('     ')).toBe('')
  })
  it('deve retornar uma string vazia se o nome completo for nulo ou indefinido', () => {
    expect(getIniciaisPrimeiroUltimoNome(null as unknown as undefined)).toBe('')
    expect(getIniciaisPrimeiroUltimoNome()).toBe('')
  })
})

describe('getFirstAndLastName', () => {
  it('deve retornar o primeiro e o último nome corretamente', () => {
    expect(getPrimeiroUltimoNome('JOHN ALOE DOE')).toBe('JOHN DOE')
    expect(getPrimeiroUltimoNome('HELENA ABIGAIL FLORES')).toBe('HELENA FLORES')
  })

  it('deve tratar nomes com múltiplos espaços corretamente', () => {
    expect(getPrimeiroUltimoNome('  ANA   CARLA   SILVA  ')).toBe('ANA SILVA')
  })

  it('deve retornar o nome quando há apenas um nome', () => {
    expect(getPrimeiroUltimoNome('JOHN')).toBe('JOHN')
    expect(getPrimeiroUltimoNome('JANE')).toBe('JANE')
  })

  it('deve lançar erro para strings vazias', () => {
    expect(() => getPrimeiroUltimoNome('')).toThrow('Nome inválido')
  })

  it('deve lançar erro para entradas não string', () => {
    expect(() => getPrimeiroUltimoNome('')).toThrow('Nome inválido')
    expect(() => getPrimeiroUltimoNome('           ')).toThrow('Nome inválido')
    // @ts-expect-error Teste entrada inválida
    expect(() => getPrimeiroUltimoNome(undefined)).toThrow('Nome inválido')
  })
})

describe('StringUtils', () => {
  describe('singularPlural', () => {
    it('Deve retornar a palavra no singular quando houver somente 1 item', () => {
      const result = StringUtils.singularPlural(1, 'comprador', 'compradores')
      expect(result).toBe('comprador')
    })

    it('Deve retornar a palavra no plural quando houver mais ou menos de 1 item', () => {
      const result = StringUtils.singularPlural(5, 'comprador', 'compradores')
      expect(result).toBe('compradores')
    })
  })
  describe('normalize', () => {
    it('Deve remover pontos e converter para lowercase', () => {
      const result = StringUtils.normalize('Hello.World - 198.441.231-09')
      expect(result).toBe('helloworld19844123109')
    })

    it('should not modify string without dots', () => {
      const result = StringUtils.normalize('HelloWorld *@#&!@($&!@ 11000000/0001-00')
      expect(result).toBe('helloworld11000000000100')
    })
  })
  describe('removeAcentos', () => {
    it('Deve remover acentos de uma string', () => {
      const result = StringUtils.removeAcentos('áéíóú')
      expect(result).toBe('aeiou')
    })
  })
})
