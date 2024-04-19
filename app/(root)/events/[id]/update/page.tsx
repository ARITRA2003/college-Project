import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs";

const updateEvent = () => {
  const {sessionClaims}=auth();
  const userId=sessionClaims?.userId as string;
  return (
    <>
    <section className="bg-dotted-pattern bg-cover bg-center  py-5 bg-primary-50"></section>
    <h3 className='wrapper h3-bold text-center'> Update Event</h3>
    <div className="">
       <EventForm userId={userId} type="update"/>
    </div>
    </>
  )
}

export default updateEvent
