"use client";
import CreateEvent from "@/Components/CreateEvent";
import DeleteEvent from "@/Components/DeleteEvent";
import GetEvent from "@/Components/GetEvent";
import { Button } from "@/Components/ui/button";
import UpdateEvent from "@/Components/UpdateEvent";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold block">Google Calendar Integration</h1>
      <div className="flex flex-wrap gap-4 mt-10">
        <Button
          onClick={() => {
            router.push("/event/create");
          }}
        >
          Create Event
        </Button>
        {/* <DeleteEvent />
        <UpdateEvent />
        <GetEvent /> */}
      </div>
    </div>
  );
}
