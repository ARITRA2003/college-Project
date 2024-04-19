import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-5">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap:0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Create Event,Buy Tickets,Cancel Tickets
            </h1>
            <Button size="lg" asChild className=" button w-full sm:w-fit ">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

        </div>

      </section>
      <section id="events" className="my-8 flex flex-col gap-8">
          <h2 className="h2-bold"> </h2>
      </section>
    </>
  );
}
