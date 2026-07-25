import Image from 'next/image';
import Link from 'next/link';
import InsuranceMarquee from '../components/InsuranceMarquee';

const whatsappNumber = '919500008454';
const sectionLabelClass = 'text-xs font-bold uppercase tracking-[0.28em] text-[#F4D06F]';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <header className="sticky top-0 z-40 border-b border-[#F4D06F]/25 bg-[#0057D9]/95 text-white shadow-2xl shadow-slate-950/10 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-[#F4D06F]/35 bg-white/10 shadow-lg shadow-blue-950/30">
              <Image
                src="/images/logo/91-shield.jpeg"
                alt="91 Insurance Services logo"
                width={48}
                height={48}
                className="h-12 w-12 object-cover"
                priority
              />
            </span>
            <span>
              <span className="block text-base font-bold leading-tight">91 Insurance Services</span>
              <span className="block text-xs font-medium text-white/75">Premium support</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/80 lg:flex">
            <a href="#home" className="transition hover:text-[#D4AF37]">Home</a>
            <Link href="/quotes/request" className="transition hover:text-[#D4AF37]">Vehicle Insurance</Link>
            <Link href="/finance" className="transition hover:text-[#D4AF37]">Finance</Link>
            <a href="#contact" className="transition hover:text-[#D4AF37]">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden rounded-lg border border-[#F4D06F]/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:inline-flex">
              Login
            </Link>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-950/20 transition hover:bg-[#F4D06F]">
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-black text-slate-950 shadow-2xl shadow-emerald-950/25 ring-1 ring-[#F4D06F]/60 transition hover:bg-[#F4D06F]"
      >
        WhatsApp Quick Call
      </a>

      <section id="home" className="relative overflow-hidden bg-transparent text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(244,208,111,0.18),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(212,175,55,0.16),transparent_24%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-[#F4D06F]/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#F4D06F]">
              Insurance, Finance
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Trusted Partner for Vehicle Insurance, Finance & Transport Solutions Across India!
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
             Your Trusted Premium Service Desk for Policy Renewal and Vehicle Finance Across India
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/quotes/request" className="rounded-lg bg-[#D4AF37] px-5 py-3 text-center text-sm font-black text-slate-950 shadow-xl shadow-amber-950/20 transition hover:bg-[#F4D06F]">
                Get Insurance Quote
              </Link>
              <Link href="/finance" className="rounded-lg border border-[#F4D06F]/50 bg-white/10 px-5 py-3 text-center text-sm font-black text-white shadow-xl shadow-blue-950/30 transition hover:border-[#D4AF37] hover:bg-white/15">
                Apply Vehicle Finance
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {['Same-day WhatsApp response', 'Chidambaram local office', 'Insurance + finance + travel'].map((item) => (
                <div key={item} className="rounded-lg border border-[#F4D06F]/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#F4D06F]/20 bg-white/10 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="rounded-2xl bg-[#0057D9] p-5 text-white ring-1 ring-[#F4D06F]/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F4D06F]">Service Console</p>
                  <h2 className="mt-1 text-2xl font-black">Quick Enquiry Desk</h2>
                </div>
                <span className="rounded-full bg-[#F4D06F] px-3 py-1 text-xs font-black text-slate-950">Live</span>
              </div>

              <div className="mt-5 grid gap-3">
                {[
                  ['01', 'Vehicle Insurance', 'Bike, car, commercial renewals'],
                  ['02', 'Vehicle Finance', 'New, used, refinance, top-up'],
                ].map(([count, title, text]) => (
                  <a key={title} href={title === 'Vehicle Insurance' ? '/quotes/request' : '/finance'} className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-[#F4D06F]/20 bg-white/5 p-4 transition hover:border-[#D4AF37] hover:bg-white/10">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#D4AF37] text-sm font-black text-slate-950">{count}</span>
                    <span>
                      <span className="block font-black text-white">{title}</span>
                      <span className="mt-1 block text-sm text-white/75">{text}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-9 max-w-3xl">
          <p className={sectionLabelClass}>Core services</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">The 3 pillars of 91 Insurance Services</h2>
          <p className="mt-4 text-base leading-7 text-white/80">A focused business flow: select the service, fill the form, send the enquiry to WhatsApp, and get follow-up directly.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ['Vehicle Insurance', 'Bike, car, and commercial policy renewal support with quote follow-up.', 'from-[#0057D9] to-[#1D7CFF]'],
            ['Vehicle Finance', 'New vehicle loans, used car finance, refinance, and top-up loan enquiries.', 'from-[#0057D9] to-[#1D7CFF]'],
          ].map(([title, text, gradient]) => (
            <article key={title} className="overflow-hidden rounded-2xl border border-[#F4D06F]/20 bg-white/10 shadow-xl shadow-slate-950/20 backdrop-blur">
              <div className={`h-2 bg-gradient-to-r ${gradient}`} />
              <div className="p-6">
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">{text}</p>
                <a href={title === 'Vehicle Insurance' ? '/quotes/request' : '/finance'} className="mt-6 inline-flex text-sm font-black text-[#F4D06F] hover:text-[#D4AF37]">
                  Start enquiry
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <InsuranceMarquee />

      <footer id="contact" className="bg-[#00123b] px-5 py-12 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="sm:pr-4">
              <h2 className="text-xl font-black text-white">91 Insurance Services</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">Vehicle insurance, finance, enquiries handled through WhatsApp follow-up.</p>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#F4D06F]">Office</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">Chidambaram<br />Tamil Nadu, India</p>
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#F4D06F]">Contact</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">WhatsApp: +91 99424 85508</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="text-[#F4D06F] hover:text-[#D4AF37]">WhatsApp</a>
                <a href="#" className="text-white/70 hover:text-white">Facebook</a>
                <a href="#" className="text-white/70 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#F4D06F]/20 bg-white/5 shadow-2xl shadow-slate-950/30">
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F4D06F]">Working Hours</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Monday to Saturday<br />9:30 AM to 7:00 PM</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1955.6234104633133!2d79.6861338837163!3d11.389610998535321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54c328099be299%3A0x69230cd7c06f815e!2s91%20insurance%20services!5e0!3m2!1sen!2sin!4v1784986449020!5m2!1sen!2sin"
              width="100%"
              height="180"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              title="91 Insurance Services location map"
              className="block w-full"
            />
          </div>
        </div>
      </footer>
    </main>
  );
}
