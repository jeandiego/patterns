export class StringUtils {
  static singularPlural(number: number, singularWord: string, pluralWord: string) {
    return number === 1 ? singularWord : pluralWord
  }

  static normalize(str: string) {
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  }

  static capitalize(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ')
  }

  static removeAcentos(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  static readonly removeSpecialCharacters = (value: string): string => value?.replace(/\D/g, '')
}
