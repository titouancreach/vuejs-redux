import { INCREMENT, DECREMENT, RESET, OTHER, OTHER_RESET } from './types.js'
export function increment() {
  return { type: INCREMENT }
}

export function decrement() {
  return { type: DECREMENT }
}

export function reset(count3) {
  return { type: RESET, count3 }
}

export function other(count5) {
  return { type: OTHER, count5 }
}

export function other_reset() {
  return { type: OTHER_RESET }
}
