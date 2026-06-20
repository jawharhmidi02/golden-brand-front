// GoldenBrand — maintenance / coming soon overlay.
// Renders a heavy backdrop blur over the real page content so colours and light
// bleed through (alive, not a flat black wall) while nothing stays readable,
// with a centered glass card carrying the maintenance message.
//
// Server component: zero client JS. Bilingual (EN/AR), RTL-aware, responsive
// from 320px to ultrawide, and honours prefers-reduced-motion.

const CONTENT = {
  en: {
    eyebrow: "Under Maintenance",
    title: "We'll Be Back Soon",
    description:
      "GoldenBrand is undergoing scheduled maintenance to bring you a better experience. Please check back shortly.",
    badge: "Coming Soon",
    urgentLabel: "Urgent inquiries",
    email: "sales@goldenbrandqa.com",
    phoneDisplay: "+974 7748 0070",
    phoneHref: "+97477480070",
    note: "Thank you for your patience.",
  },
  ar: {
    eyebrow: "تحت الصيانة",
    title: "سنعود قريباً",
    description:
      "يخضع موقع جولدن براند لصيانة مجدولة لتقديم تجربة أفضل. يرجى التحقق مرة أخرى قريباً.",
    badge: "قريباً",
    urgentLabel: "للاستفسارات العاجلة",
    email: "sales@goldenbrandqa.com",
    phoneDisplay: "+974 7748 0070",
    phoneHref: "+97477480070",
    note: "شكراً لصبركم.",
  },
};

export default function ComingSoon({ locale = "en" }) {
  const t = CONTENT[locale] === undefined ? CONTENT.en : CONTENT[locale];
  const isRtl = locale === "ar";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8"
      style={{
        // Semi-dark tint over a very heavy backdrop blur of the page beneath.
        // Keeps colour/light bleed-through but makes everything unreadable,
        // without becoming a flat black wall.
        backgroundColor: "rgba(7, 11, 20, 0.55)",
        backdropFilter: "blur(120px) saturate(110%)",
        WebkitBackdropFilter: "blur(120px) saturate(110%)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
    >
      {/* Radial vignette to focus the center and deepen the edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Glass card */}
      <div className="relative w-full max-w-lg animate-fadein">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-10 text-center shadow-2xl backdrop-blur-md sm:px-10 sm:py-12 md:px-14 md:py-14">
          {/* Gold top-edge accent */}
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #ffd700 50%, transparent 100%)",
            }}
          />

          {/* Signature: animated gold shimmer badge */}
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffd700]/30 bg-[#ffd700]/10 px-4 py-1.5 ${isRtl ? "font-montserrat" : ""}`}
          >
            <span
              className="animate-shimmer bg-clip-text text-sm font-semibold uppercase tracking-[0.2em] text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #daa520 0%, #ffd700 45%, #fff7cf 50%, #ffd700 55%, #daa520 100%)",
                backgroundSize: "200% auto",
              }}
            >
              {t.badge}
            </span>
          </div>

          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            {t.eyebrow}
          </p>

          <h1
            id="coming-soon-title"
            className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--sixth-family)" }}
          >
            {t.title}
          </h1>

          <p
            className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/70 sm:text-base"
            style={{ fontFamily: "var(--third-family)" }}
          >
            {t.description}
          </p>

          {/* Urgent inquiries */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <span className="text-xs uppercase tracking-wider text-white/40">
              {t.urgentLabel}
            </span>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <a
                href={`mailto:${t.email}`}
                className="text-sm font-medium text-[#ffd700] transition-opacity hover:opacity-80"
              >
                {t.email}
              </a>
              <span className="hidden text-white/20 sm:inline">•</span>
              <a
                href={`tel:${t.phoneHref}`}
                className="text-sm font-medium text-white/85 transition-opacity hover:opacity-80"
              >
                {t.phoneDisplay}
              </a>
            </div>
          </div>

          <p className="mt-8 text-xs text-white/35">{t.note}</p>
        </div>
      </div>

      {/* Reduced motion: disable the animated shimmer + fade-in */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer,
          .animate-fadein {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
