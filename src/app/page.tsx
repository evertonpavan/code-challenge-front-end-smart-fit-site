import { ScheduleForm } from "@/components/schedule-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Header />
      <ScheduleForm />
      <Footer />
    </main>
  );
}
