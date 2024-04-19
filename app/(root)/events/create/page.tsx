import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs";

const CreateEvent = () => {
  const {sessionClaims}=auth();
  const userId=sessionClaims?.userId as string;
  console.log(userId);
  return (
    <>
    <section className="bg-dotted-pattern bg-cover bg-center  py-5 bg-primary-50 md:py-10"></section>
    <h3 className='wrapper h3-bold text-center'> Create Event</h3>
    <div className="wrapper my-8">
       <EventForm userId={userId} type="create"/>
    </div>
    </>
  )
}

export default CreateEvent
