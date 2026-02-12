"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="rounded-full bg-red-500/10 p-6">
        <AlertTriangle
          className="h-12 w-12 text-red-500"
          aria-hidden="true"
        />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-white">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-neutral-400">
        We encountered an unexpected error. Please try again or return to the
        home page.
      </p>
      {error.digest && (
        <p className="mt-2 text-sm text-neutral-500">
          Error ID: {error.digest}
        </p>
      )}
      <div className="mt-8 flex gap-4">
        <Button variant="outline" onClick={reset}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </Button>
        <Link href="/">
          <Button>
            <Home className="h-4 w-4" aria-hidden="true" />
            Go Home
          </Button>
        </Link>
      </div>
    </Container>
  );
}
