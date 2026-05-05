import React from 'react'
import { Edit2, Info, Share2, Download, Trash, X } from 'lucide-react'

/* ──────────────────────────────────────────
   File-type icon renderers
   ────────────────────────────────────────── */
const DocIcon = ({ ext = 'DOC', color = '#3B48A3', subColor = '#2F3982' }) => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill={color} />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill={subColor} />
    <path d="M22.56 38.67H51.48C52.13 38.67 52.66 39.2 52.66 39.84V50.45C52.66 51.1 52.13 51.62 51.48 51.62H22.56C21.92 51.62 21.39 51.1 21.39 50.45V39.84C21.39 39.2 21.92 38.67 22.56 38.67Z" fill={subColor} />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Poppins,sans-serif">{ext.toUpperCase()}</text>
  </>
)

const PdfIcon = ({ ext = 'PDF', color = '#E74C3C', subColor = '#C0392B' }) => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill={color} />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill={subColor} />
    <path d="M22.56 38.67H51.48C52.13 38.67 52.66 39.2 52.66 39.84V50.45C52.66 51.1 52.13 51.62 51.48 51.62H22.56C21.92 51.62 21.39 51.1 21.39 50.45V39.84C21.39 39.2 21.92 38.67 22.56 38.67Z" fill={subColor} />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Poppins,sans-serif">{ext.toUpperCase()}</text>
  </>
)

const CsvIcon = ({ ext = 'CSV', color = '#27AE60', subColor = '#1E8449' }) => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill={color} />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill={subColor} />
    <path d="M22.56 38.67H51.48C52.13 38.67 52.66 39.2 52.66 39.84V50.45C52.66 51.1 52.13 51.62 51.48 51.62H22.56C21.92 51.62 21.39 51.1 21.39 50.45V39.84C21.39 39.2 21.92 38.67 22.56 38.67Z" fill={subColor} />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Poppins,sans-serif">{ext.toUpperCase()}</text>
  </>
)

const TxtIcon = ({ ext = 'TXT', color = '#7F8C8D', subColor = '#636E72' }) => (
  <>
    <path d="M33.83 20.79H48.05L60.61 33.34V57.46C60.61 60.39 58.21 62.79 55.28 62.79H33.83C30.9 62.79 28.5 60.39 28.5 57.46V26.11C28.5 23.18 30.9 20.79 33.83 20.79Z" fill={color} />
    <path d="M48.05 20.79L60.61 33.34H49.41C48.66 33.34 48.05 32.74 48.05 31.99V20.79Z" fill={subColor} />
    <path d="M22.56 38.67H51.48C52.13 38.67 52.66 39.2 52.66 39.84V50.45C52.66 51.1 52.13 51.62 51.48 51.62H22.56C21.92 51.62 21.39 51.1 21.39 50.45V39.84C21.39 39.2 21.92 38.67 22.56 38.67Z" fill={subColor} />
    <text x="37" y="47.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Poppins,sans-serif">{ext.toUpperCase()}</text>
  </>
)

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

const XdIcon = () => (
  <>
    <rect x="24" y="24" width="34" height="34" rx="7" fill="#FF61F6" />
    <text x="41" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Poppins,sans-serif">Xd</text>
  </>
)

const FigmaIcon = () => (
  <>
    <path d="M35 22H41V34H35C31.69 34 29 31.31 29 28C29 24.69 31.69 22 35 22Z" fill="#F24E1E" />
    <path d="M41 22H47C50.31 22 53 24.69 53 28C53 31.31 50.31 34 47 34H41V22Z" fill="#FF7262" />
    <path d="M35 34H41V46H35C31.69 46 29 43.31 29 40C29 36.69 31.69 34 35 34Z" fill="#A259FF" />
    <path d="M35 46H41V52C41 55.31 38.31 58 35 58C31.69 58 29 55.31 29 52C29 48.69 31.69 46 35 46Z" fill="#0ACF83" />
    <circle cx="47" cy="40" r="6" fill="#1ABCFE" />
  </>
)

const iconConfigs = {
  doc:          { color: '#3B48A3', sub: '#2F3982', render: DocIcon },
  docx:         { color: '#3B48A3', sub: '#2F3982', render: DocIcon },
  pdf:          { color: '#E74C3C', sub: '#C0392B', render: PdfIcon },
  xls:          { color: '#27AE60', sub: '#1E8449', render: CsvIcon },
  xlsx:         { color: '#27AE60', sub: '#1E8449', render: CsvIcon },
  csv:          { color: '#27AE60', sub: '#1E8449', render: CsvIcon },
  ppt:          { color: '#E67E22', sub: '#D35400', render: TxtIcon },
  pptx:         { color: '#E67E22', sub: '#D35400', render: TxtIcon },
  zip:          { color: '#F1C40F', sub: '#F39C12', render: TxtIcon },
  rar:          { color: '#F1C40F', sub: '#F39C12', render: TxtIcon },
  js:           { color: '#F7DF1E', sub: '#C8B000', render: TxtIcon },
  py:           { color: '#3776AB', sub: '#2C5F8A', render: TxtIcon },
  html:         { color: '#E34F26', sub: '#B03B1C', render: TxtIcon },
  css:          { color: '#1572B6', sub: '#105B91', render: TxtIcon },
  json:         { color: '#000000', sub: '#333333', render: TxtIcon },
  txt:          { color: '#7F8C8D', sub: '#636E72', render: TxtIcon },
  sketch:       { color: '#F5A623', sub: '#F5A623', render: SketchIcon },
  xd:           { color: '#FF61F6', sub: '#FF61F6', render: XdIcon },
  fig:          { color: '#A259FF', sub: '#A259FF', render: FigmaIcon },
}

const getIconType = (type, name = '') => {
  const ext = name.split('.').pop().toLowerCase();
  if (iconConfigs[ext]) return ext;
  if (iconConfigs[type]) return type;
  if (ext === 'pdf') return 'pdf';
  if (['xls', 'xlsx'].includes(ext)) return 'xls';
  if (['ppt', 'pptx'].includes(ext)) return 'ppt';
  if (['zip', 'rar', '7z'].includes(ext)) return 'zip';
  return 'doc';
};

export const FileTypeIcon = ({ type, name }) => {
  const iconKey = getIconType(type, name)
  const config = iconConfigs[iconKey] || iconConfigs.doc
  const ext = name.split('.').pop() || 'DOC'
  return (
    <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.1" width="82" height="82" rx="41" fill={config.color} />
      {config.render({ ext, color: config.color, subColor: config.sub })}
    </svg>
  )
}
