import GeoLabLogo from './GeoLabLogo'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Finance Tracker · საფინალო პროექტი</p>
        <div className="flex items-center gap-2">
          <span>შექმნილია</span>
          <GeoLabLogo className="h-8" />
          <span className="font-semibold text-slate-700">GeoLab</span>
        </div>
      </div>
    </footer>
  )
}
