"use client";

import Image from "next/image";

const companies = [
  { name: "New India Assurance", image: "/images/insurance/in1.jpeg" },
  { name: "United India", image: "/images/insurance/in2.jpeg" },
  { name: "IFFCO Tokio", image: "/images/insurance/in3.jpeg" },
  { name: "SBI General", image: "/images/insurance/in4.jpeg" },
  { name: "National Insurance", image: "/images/insurance/in5.jpeg" },
  { name: "TATA AIG", image: "/images/insurance/in6.jpeg" },
  { name: "Universal Sompo", image: "/images/insurance/in7.jpeg" },
  { name: "Oriental Insurance", image: "/images/insurance/in8.jpeg" },
];

export default function InsuranceMarquee() {
  const items = [...companies, ...companies];

  return (
    <section className="relative mt-20 overflow-hidden border-y border-white/10 bg-[#003fa3] py-14 text-white">
      <style jsx>{`
        @keyframes partner-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .partner-track {
          animation: partner-marquee 32s linear infinite;
        }

        .partner-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .partner-track {
            animation-duration: 18s;
          }
        }
      `}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,208,111,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.12),_transparent_22%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F4D06F]">Partners</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Trusted Insurance Partners
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
            We work with India&apos;s leading insurance companies to help you compare and renew with confidence.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#003fa3] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#003fa3] to-transparent" />

          <div className="overflow-hidden">
            <div className="partner-track flex w-[200%] items-center">
              {items.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="mx-2 flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-none border-0 bg-transparent px-2 shadow-none transition duration-300 hover:-translate-y-1 sm:mx-4 sm:h-32 sm:w-56 sm:px-4"
                >
                  <Image
                    src={company.image}
                    alt={company.name}
                    width={180}
                    height={100}
                    className="max-h-12 w-auto object-contain sm:max-h-20"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
