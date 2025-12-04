import Eventcard from "@/components/Eventcard"
import Explore_btn from "@/components/explore_btn"
import events from "@/lib/constanrs"

const Page = () => {
  return (
  <section>
    <h1 className="text-center"> The Hub for every Event</h1>
    <p className="text-center mt-5">Hackathons, Meetups and Conferences all in one spot</p>
    <Explore_btn/>
    <div className="mt-20 space-y-7">
      <h3>Featured Events</h3>
      <ul className="events">
        {events.map((event)=>(
          <li key={event.title}><Eventcard {...event} /></li>
        ))}
      </ul>
    </div>
  </section>
  )
}
export default Page