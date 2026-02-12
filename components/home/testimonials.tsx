import { Container } from "@/components/layout/container";
import { Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  location: string;
  title: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Wasiu Adebanjo",
    location: "Lagos, Nigeria",
    title: "Exceptional Service",
    quote:
      "Arrivo made booking our Lagos weekend getaway completely stress‑free. The listings were exactly as described and the support was outstanding.",
  },
  {
    id: 2,
    name: "Emilia Johnson",
    location: "Abuja, Nigeria",
    title: "Efficient and Reliable",
    quote:
      "From search to check‑in, everything was smooth. We found a beautiful apartment in minutes and the host communication was top‑notch.",
  },
  {
    id: 3,
    name: "John Mark",
    location: "Port Harcourt, Nigeria",
    title: "Trusted Advisors",
    quote:
      "Arrivo guided us through the entire booking process. Their recommendations fit our budget and neighborhood preferences perfectly.",
  },
];

export function Testimonials() {
  return (
    <section
      className="border-y border-neutral-900 bg-neutral-950 py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="mt-2 text-2xl font-bold text-white md:text-3xl"
            >
              What Our Clients Say
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-400 md:text-base">
              Hear from travelers who found their perfect stays with Arrivo.
              Real experiences from real guests across Nigeria.
            </p>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-100 transition-colors hover:border-violet-500 hover:bg-neutral-900/80"
          >
            View All Testimonials
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-sm shadow-black/40"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 text-violet-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-violet-500 text-violet-500"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Content */}
              <div className="mt-4 space-y-3">
                <h3 className="text-sm font-semibold text-white md:text-base">
                  {t.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {t.quote}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-neutral-800 pt-4">
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.location}</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-xs font-semibold text-neutral-200">
                  {t.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Slider Footer (static for now) */}
        <div className="mt-8 flex items-center justify-between text-xs text-neutral-500">
          <span>
            01 of {testimonials.length.toString().padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-violet-500 hover:text-white"
              aria-label="Previous testimonial"
            >
              &#8592;
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-violet-500 hover:text-white"
              aria-label="Next testimonial"
            >
              &#8594;
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

