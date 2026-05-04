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
        <p className="type-caption">© {new Date().getFullYear()} artiFACT. Reformed apologetics.</p>
      </div>
    </footer>
  )
}
