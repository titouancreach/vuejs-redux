import { OTHER, OTHER_RESET } from '../Actions/types'

export function counter2(state = { count6: 44 }, action) {
  switch (action.type) {
    case OTHER:
      return { count6: action.count5 }
    case OTHER_RESET:
      return { count6: 44 }
    default:
      return state
  }
}
