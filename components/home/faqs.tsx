import { Container } from "@/components/layout/container";

type FaqItem = {
  id: number;
  question: string;
  summary: string;
};

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "How do I search for stays on Arrivo?",
    summary:
      "Use the search bar and filters to find stays by city, price range, guests, and property type that match your trip.",
  },
  {
    id: 2,
    question: "What fees should I expect when booking?",
    summary:
      "Most listings include nightly rate, cleaning fees, and service fees. You will always see a full price breakdown before you confirm.",
  },
  {
    id: 3,
    question: "Is it safe to book through Arrivo?",
    summary:
      "Yes. Payments are processed securely, and we never share your payment details with hosts. All communication stays on the Arrivo platform.",
  },
];

export function Faqs() {
  return (
    <section
      className="bg-neutral-950 py-16 md:py-24"
      aria-labelledby="faqs-heading"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Help Center
            </p>
            <h2
              id="faqs-heading"
              className="mt-2 text-2xl font-bold text-white md:text-3xl"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-400 md:text-base">
              Find answers to common questions about booking stays, payments,
              and safety on Arrivo.
            </p>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-100 transition-colors hover:border-violet-500 hover:bg-neutral-900/80"
          >
            View All FAQs
          </button>
        </div>

        {/* FAQ Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-sm shadow-black/40"
            >
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white md:text-base">
                  {faq.question}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {faq.summary}
                </p>
              </div>
              <button
                type="button"
                className="mt-6 inline-flex w-fit items-center justify-center rounded-lg border border-neutral-700 px-3 py-1.5 text-xs font-medium text-neutral-100 transition-colors hover:border-violet-500 hover:bg-neutral-900"
              >
                Read More
              </button>
            </article>
          ))}
        </div>

        {/* Slider footer (static) */}
        <div className="mt-8 flex items-center justify-between text-xs text-neutral-500">
          <span>
            01 of {faqs.length.toString().padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-violet-500 hover:text-white"
              aria-label="Previous question"
            >
              &#8592;
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-violet-500 hover:text-white"
              aria-label="Next question"
            >
              &#8594;
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

