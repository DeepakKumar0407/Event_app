import { notFound } from "next/navigation"

const EventDetails = async ({params}:{params:Promise<{slug:string}>}) => {
  const {slug} = await params
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${BASE_URL}/api/events/${slug}`)
  const {events} = await res.json()
  if(!events) return notFound()
  return (
    <section id="event">
      <h1>Event Details <br/>{slug}</h1>
      <h2>{events.title}</h2>
    </section>
  )
}
export default EventDetails