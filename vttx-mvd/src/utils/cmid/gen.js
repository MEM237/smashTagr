import listOne from './list_one.json'
import listTwo from './list_two.json'

export function generateCMID() {
  const first = listOne[Math.floor(Math.random() * listOne.length)]
  const second = listTwo[Math.floor(Math.random() * listTwo.length)]
  return `${first} ${second}`
}
