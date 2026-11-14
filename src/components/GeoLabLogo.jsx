// ჯეოლაბის ლოგო — დაკლიკებით გადადის https://geolab.edu.ge/ (ახალ ტაბში)
export default function GeoLabLogo({ className = 'h-9', ...props }) {
  return (
    <a
      href="https://geolab.edu.ge/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GeoLab — გახსენი geolab.edu.ge"
      title="GeoLab"
      className="inline-flex shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      {...props}
    >
      <img src="/geolab-logo.webp" alt="GeoLab-ის ლოგო" width="31" height="40" className={`${className} w-auto`} decoding="async" />
    </a>
  )
}
