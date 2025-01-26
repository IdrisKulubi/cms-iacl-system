import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/layout/site-layout";
import Link from "next/link";

export default function Home() {
  return (
    <SiteLayout>
      <section className="container flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Performance Management <br />
          Made Simple
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Track, manage, and improve performance with our comprehensive system.
          Built for modern organizations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/features">Learn More</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
