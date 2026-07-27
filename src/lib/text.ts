/**
 * Splits text into animatable tokens.
 *
 * The original design staggered on spaces, which works for Latin copy. Chinese
 * has no word spaces, so a whole sentence would collapse into one token and the
 * stagger would vanish. CJK runs are therefore split into characters while Latin
 * runs stay whole words — both end up with a comparable number of tokens.
 */
const CJK = /[㐀-䶿一-鿿぀-ヿ＀-￯　-〿]/

export interface Token {
  text: string
  /** Latin words need a trailing space rendered; CJK characters must not have one. */
  space: boolean
}

export function tokenize(text: string): Token[] {
  const tokens: Token[] = []

  for (const chunk of text.split(/(\s+)/)) {
    if (!chunk || /^\s+$/.test(chunk)) continue

    if (CJK.test(chunk)) {
      let latin = ''

      // Walk the chunk so mixed strings like "AI时代" split correctly.
      for (const char of chunk) {
        if (CJK.test(char)) {
          if (latin) {
            tokens.push({ text: latin, space: false })
            latin = ''
          }
          tokens.push({ text: char, space: false })
        } else {
          latin += char
        }
      }

      if (latin) tokens.push({ text: latin, space: false })
      if (tokens.length) tokens[tokens.length - 1].space = true
    } else {
      tokens.push({ text: chunk, space: true })
    }
  }

  if (tokens.length) tokens[tokens.length - 1].space = false
  return tokens
}
