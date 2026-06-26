export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E4DF]">
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="type-display text-lg text-[#1A1A1A] mb-1">
            arti<span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: '0.04em' }}>FACT</span>
          </p>
          <p className="type-caption">The excavation continues.</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <a
            href="mailto:info@artifacttruth.org"
            className="type-caption px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF8F5] transition-colors duration-200"
          >
            Contact Us
          </a>
          <p className="type-caption">© {new Date().getFullYear()} artiFACT. Reformed apologetics.</p>
        </div>
      </div>
    </footer>
  )
}
