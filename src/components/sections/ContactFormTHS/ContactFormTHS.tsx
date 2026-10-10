"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useReveal } from "@/lib/useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const FLOWER = "/images/shapes/flowerPaperCreame.png";
const INQUIRY_EMAIL = "hello@thehuestory.com";

/** Entrance timeline (seconds). */
const BASE = 0.1;
const FIELD_START = BASE + 0.55;
const FIELD_STEP = 0.08;
const MESSAGE_DELAY = FIELD_START + 4 * FIELD_STEP;

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date";
  required?: boolean;
  autoComplete?: string;
};

const FIELDS: readonly Field[] = [
  { name: "names", label: "Your names", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "date", label: "Event date", type: "date" },
];

const LABEL =
  "font-body block text-[10px] font-normal tracking-[0.24em] text-cream/55 uppercase transition-colors duration-300 group-focus-within:text-cream sm:text-[10.5px]";
const INPUT =
  "font-body block w-full rounded-none border-0 bg-transparent px-0 pt-1 pb-2.5 text-[14px] font-normal tracking-[0.01em] text-cream outline-none [color-scheme:dark] placeholder:text-cream/30 sm:text-[15px]";

/** Resting hairline draws in on reveal; a cream line sweeps across on focus. */
function Underline({ on, delay }: { on: boolean; delay: number }) {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-cream/25"
        style={{
          transform: on ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 1.3s ${EASE} ${delay}s`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100"
      />
    </>
  );
}

/**
 * ContactFormTHS — slate band · flower · lead · double-hairline framed form
 * Submits by opening the visitor's mail app, addressed to the studio.
 */
export default function ContactFormTHS() {
  const [ref, inView] = useReveal<HTMLElement>(0.12);
  const [sent, setSent] = useState(false);

  const rise = (delay: number, dist = "1rem") =>
    ({
      opacity: inView ? 1 : 0,
      transform: inView ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 1.1s ${EASE} ${delay}s, transform 1.2s ${EASE} ${delay}s`,
    }) as const;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const lines = [
      ...FIELDS.map((f) => `${f.label}: ${get(f.name) || "-"}`),
      "",
      get("message"),
    ];
    const subject = `Inquiry: ${get("names")}`;
    window.location.href = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <section
      ref={ref}
      aria-label="Inquiry form"
      className="relative w-full bg-base text-cream"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28">
        <div
          className="relative h-11 w-11 sm:h-12 sm:w-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translate3d(0,0,0) rotate(-8deg) scale(1)"
              : "translate3d(0,0.6rem,0) rotate(-28deg) scale(0.85)",
            transition: `opacity 1.2s ${EASE} ${BASE}s, transform 1.6s ${EASE} ${BASE}s`,
          }}
        >
          <Image src={FLOWER} alt="" fill sizes="48px" className="object-contain" aria-hidden />
        </div>

        <p
          className="font-body mt-5 max-w-md text-center text-[12px] leading-[1.85] font-normal tracking-[0.01em] text-cream/80 sm:text-[13px] sm:leading-[1.9] md:text-[14px] md:leading-[1.95]"
          style={rise(BASE + 0.15, "0.8rem")}
        >
          Every occasion begins with a conversation. Tell us the story you
          wish to tell.
        </p>

        <div
          className="mt-10 w-full border border-cream/20 p-1.5 sm:mt-12 sm:p-2"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1)" : "scale(0.985)",
            transition: `opacity 1.4s ${EASE} ${BASE + 0.3}s, transform 1.6s ${EASE} ${BASE + 0.3}s`,
          }}
        >
          <form
            onSubmit={onSubmit}
            className="border border-cream/10 px-5 pt-9 pb-10 sm:px-10 sm:pt-12 sm:pb-12 md:px-12"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 sm:gap-y-8">
              {FIELDS.map((f, i) => {
                const d = FIELD_START + i * FIELD_STEP;
                return (
                  <label
                    key={f.name}
                    className="group block"
                    style={rise(d, "0.9rem")}
                  >
                    <span className={LABEL}>
                      {f.label}
                      {f.required ? <span className="text-blush"> *</span> : null}
                    </span>
                    <span className="relative mt-2.5 block">
                      <input
                        name={f.name}
                        type={f.type ?? "text"}
                        required={f.required}
                        autoComplete={f.autoComplete}
                        className={INPUT}
                      />
                      <Underline on={inView} delay={d + 0.15} />
                    </span>
                  </label>
                );
              })}

              <label
                className="group block sm:col-span-2"
                style={rise(MESSAGE_DELAY, "0.9rem")}
              >
                <span className={LABEL}>Tell us about your celebration</span>
                <span className="relative mt-2.5 block">
                  <textarea
                    name="message"
                    rows={4}
                    className={`${INPUT} resize-none leading-[1.8]`}
                  />
                  <Underline on={inView} delay={MESSAGE_DELAY + 0.15} />
                </span>
              </label>
            </div>

            <div
              className="mt-11 flex flex-col items-center sm:mt-12"
              style={rise(MESSAGE_DELAY + 0.2, "0.8rem")}
            >
              <button
                type="submit"
                className="font-body group inline-flex items-center gap-4 border border-cream/60 px-9 py-3.5 text-[10.5px] font-normal tracking-[0.28em] text-cream uppercase transition-colors duration-500 hover:bg-cream hover:text-base sm:px-11 sm:text-[11px]"
              >
                Send inquiry
                <span
                  aria-hidden
                  className="block h-px w-6 bg-current transition-all duration-500 group-hover:w-9"
                />
              </button>

              {sent ? (
                <p className="font-body mt-5 text-center text-[11px] tracking-[0.04em] text-cream/60 sm:text-[12px]">
                  Your email app should open with your details. Just press send.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
