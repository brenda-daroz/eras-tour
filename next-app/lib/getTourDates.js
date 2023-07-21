import { JSDOM } from 'jsdom'
import fs from 'fs'

const getTourDates = async (file) => {
  // const res = await fetch("https://www.taylorswift.com/tour/")
  const data = fs.readFileSync(file, "utf8")
  // console.log(data.toString())
  // const html = await data.text()

  const dom = new JSDOM(data)
  const document = dom.window.document

  const events = document.querySelectorAll('.event')
  const tourDates = Array.from(events).map(event => {
    const venue = event.querySelector('.event-venue').textContent.replace(/\s+/g, ' ').trim()
    const city = event.querySelector('.event-city').textContent.replace(/\s+/g, ' ').trim()
    const date = event.querySelector('.event-date')?.textContent.replace(/\s+/g, ' ').trim()
    return { date, location: { venue, city } }
  }
  )

  console.log('tourDates', tourDates)
  return ""
}

export default getTourDates
