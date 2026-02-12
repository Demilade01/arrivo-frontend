import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="rounded-full bg-neutral-800 p-6">
        <Search className="h-12 w-12 text-neutral-500" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-white">Page Not Found</h1>
      <p className="mt-3 max-w-md text-neutral-400">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. The page
        might have been removed or the link might be broken.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button variant="outline">
            <Home className="h-4 w-4" aria-hidden="true" />
            Go Home
          </Button>
        </Link>
        <Link href="/stays">
          <Button>
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse Stays
          </Button>
        </Link>
      </div>
    </Container>
  );
}
