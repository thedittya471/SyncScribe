import React, { useRef } from 'react'
import { useFileActions } from '../context/FileActionContext'

/* ──────────────────────────────────────────
   File-type icon renderers (inside 82×82 circle)
   ────────────────────────────────────────── */
const FileTypeIcon = ({ type = 'doc' }) => {
  const config = iconConfigs[type] || iconConfigs.doc
  return (
    <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.1" width="82" height="82" rx="41" fill={config.circleBg} />
      {config.render()}
    </svg>
  )
}

// ── DOC icon paths ──
const DocIcon = () => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill="#3B48A3" />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill="#2F3982" />
    <path d="M22.56 38.67H51.48C52.13 38.67 52.66 39.2 52.66 39.84V50.45C52.66 51.1 52.13 51.62 51.48 51.62H22.56C21.92 51.62 21.39 51.1 21.39 50.45V39.84C21.39 39.2 21.92 38.67 22.56 38.67Z" fill="#2F3982" />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Poppins,sans-serif">DOC</text>
  </>
)

// ── DOCX icon paths ──
const DocxIcon = () => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill="#3B48A3" />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill="#2F3982" />
    <path d="M20.56 38.67H53.48C54.13 38.67 54.66 39.2 54.66 39.84V50.45C54.66 51.1 54.13 51.62 53.48 51.62H20.56C19.92 51.62 19.39 51.1 19.39 50.45V39.84C19.39 39.2 19.92 38.67 20.56 38.67Z" fill="#2F3982" />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700" fontFamily="Poppins,sans-serif">DOCX</text>
  </>
)

// ── PDF icon ──
const PdfIcon = () => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill="#E74C3C" />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill="#C0392B" />
    <path d="M22.56 38.67H51.48C52.13 38.67 52.66 39.2 52.66 39.84V50.45C52.66 51.1 52.13 51.62 51.48 51.62H22.56C21.92 51.62 21.39 51.1 21.39 50.45V39.84C21.39 39.2 21.92 38.67 22.56 38.67Z" fill="#C0392B" />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Poppins,sans-serif">PDF</text>
  </>
)

// ── CSV icon ──
const CsvIcon = () => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill="#27AE60" />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill="#1E8449" />
    <path d="M22.56 38.67H51.48C52.13 38.67 52.66 39.2 52.66 39.84V50.45C52.66 51.1 52.13 51.62 51.48 51.62H22.56C21.92 51.62 21.39 51.1 21.39 50.45V39.84C21.39 39.2 21.92 38.67 22.56 38.67Z" fill="#1E8449" />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Poppins,sans-serif">CSV</text>
  </>
)

// ── TXT icon ──
const TxtIcon = () => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill="#7F8C8D" />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill="#636E72" />
    <path d="M22.56 38.67H51.48C52.13 38.67 52.66 39.2 52.66 39.84V50.45C52.66 51.1 52.13 51.62 51.48 51.62H22.56C21.92 51.62 21.39 51.1 21.39 50.45V39.84C21.39 39.2 21.92 38.67 22.56 38.67Z" fill="#636E72" />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Poppins,sans-serif">TXT</text>
  </>
)

// ── Sketch icon (yellow diamond) ──
const SketchIcon = () => (
  <>
    <path d="M41 22L55 35L41 60L27 35L41 22Z" fill="#F5A623" />
    <path d="M41 22L55 35H27L41 22Z" fill="#FDD231" />
    <path d="M41 60L27 35H41V60Z" fill="#F5A623" />
    <path d="M41 60L55 35H41V60Z" fill="#E6951D" />
    <path d="M34 22L27 35L41 22H34Z" fill="#FDD231" />
    <path d="M48 22L55 35L41 22H48Z" fill="#F5A623" />
  </>
)

// ── XD icon (pink/coral rounded rect) ──
const XdIcon = () => (
  <>
    <rect x="24" y="24" width="34" height="34" rx="7" fill="#FF61F6" />
    <text x="41" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Poppins,sans-serif">Xd</text>
  </>
)

// ── Figma icon (colorful) ──
const FigmaIcon = () => (
  <>
    {/* Top-left red */}
    <path d="M35 22H41V34H35C31.69 34 29 31.31 29 28C29 24.69 31.69 22 35 22Z" fill="#F24E1E" />
    {/* Top-right orange */}
    <path d="M41 22H47C50.31 22 53 24.69 53 28C53 31.31 50.31 34 47 34H41V22Z" fill="#FF7262" />
    {/* Mid-left purple */}
    <path d="M35 34H41V46H35C31.69 46 29 43.31 29 40C29 36.69 31.69 34 35 34Z" fill="#A259FF" />
    {/* Bottom-left green */}
    <path d="M35 46H41V52C41 55.31 38.31 58 35 58C31.69 58 29 55.31 29 52C29 48.69 31.69 46 35 46Z" fill="#0ACF83" />
    {/* Mid-right blue circle */}
    <circle cx="47" cy="40" r="6" fill="#1ABCFE" />
  </>
)

const iconConfigs = {
  doc:    { circleBg: '#FA7275', render: DocIcon },
  docx:   { circleBg: '#3B48A3', render: DocxIcon },
  pdf:    { circleBg: '#E74C3C', render: PdfIcon },
  csv:    { circleBg: '#27AE60', render: CsvIcon },
  txt:    { circleBg: '#7F8C8D', render: TxtIcon },
  sketch: { circleBg: '#F5A623', render: SketchIcon },
  xd:     { circleBg: '#FF61F6', render: XdIcon },
  fig:    { circleBg: '#A259FF', render: FigmaIcon },
}

/* ══════════════════════════════════════════
   DocumentBox Component
   ══════════════════════════════════════════ */
const DocumentBox = ({
  id,
  fileName = 'App School.doc',
  fileSize = '2 GB',
  timestamp = '10:09pm, 10 Oct',
  fileType = 'doc',
}) => {
  const { activeFile, openDropdown } = useFileActions()
  const cardRef = useRef(null)

  const isDropdownOpen = activeFile?.id === id

  return (
    <div 
      ref={cardRef}
      className={`relative w-[195px] h-[170px] bg-white rounded-[16px] font-['Poppins',sans-serif] group cursor-pointer transition-all duration-300 ease-out 
      ${isDropdownOpen ? 'z-[110] shadow-2xl scale-[1.02]' : 'z-10 shadow-md hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1'}`}>
      
      {/* ── File type icon in colored circle (top-left) ── */}
      <div className="absolute left-[14px] top-[14px] transition-transform duration-300 group-hover:scale-105">
        <svg width="68" height="68" viewBox="0 0 82 82"><FileTypeIcon type={fileType} /></svg>
      </div>

      {/* ── Three-dot menu (top-right) ── */}
      <button 
        className="absolute right-[12px] top-[14px] p-1 opacity-50 hover:opacity-90 transition-opacity z-[101]"
        onClick={(e) => {
          e.stopPropagation()
          const rect = cardRef.current.getBoundingClientRect()
          openDropdown({ 
            id, 
            name: fileName, 
            size: fileSize, 
            time: timestamp, 
            type: fileType 
          }, rect)
        }}
      >
        <svg width="14" height="30" viewBox="0 0 14 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="5" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
          <circle cx="7" cy="15" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
          <circle cx="7" cy="25" r="2.5" stroke="#A3B2C7" strokeWidth="1.5" />
        </svg>
      </button>

      {/* ── File size (right side, below dots) ── */}
      <span className="absolute right-[14px] top-[68px] text-[#333F4E] text-base font-medium">
        {fileSize}
      </span>

      {/* ── File name ── */}
      <h3 className="absolute left-[14px] bottom-[32px] text-[#333F4E] text-[13px] font-semibold truncate max-w-[165px] transition-colors duration-200 group-hover:text-[#1a202c]">
        {fileName}
      </h3>

      {/* ── Timestamp ── */}
      <p className="absolute left-[14px] bottom-[12px] text-[#333F4E]/70 text-xs">
        {timestamp}
      </p>
    </div>
  )
}

export default DocumentBox
