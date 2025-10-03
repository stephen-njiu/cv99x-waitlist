import Image from "next/image"; // i will be using images later
import WaitlistForm from "./components/WaitlistForm";

export default function Home() {
  return (
    <main className="bg-neutral-900">
      <WaitlistForm />
      <div>Home page</div>
    </main>
  );
}
