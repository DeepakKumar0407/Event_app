import Eventcard from "@/components/Eventcard"
import Explore_btn from "@/components/explore_btn"
import { IEvent } from "@/database"


const Page = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const res = await fetch(`${BASE_URL}/api/events`)
  const {events} = await res.json()
  return (
  <section>
    <h1 className="text-center"> The Hub for every Event</h1>
    <p className="text-center mt-5">Hackathons, Meetups and Conferences all in one spot</p>
    <Explore_btn/>
    <div className="mt-20 space-y-7">
      <h3>Featured Events</h3>
      <ul className="events">
        {events && events.length>0 && events.map((event:IEvent)=>(
          <li key={event.title}><Eventcard {...event} /></li>
        ))}
      </ul>
    </div>
  </section>
  )
}
export default Page