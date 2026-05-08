import React from 'react'

// Small icon SVGs for each category type
const iconPaths = {
  documents: (
    <>
      <path d="M38 27H57C58.1 27 59 27.9 59 29V55C59 56.1 58.1 57 57 57H38C36.9 57 36 56.1 36 55V29C36 27.9 36.9 27 38 27Z" fill="white" />
      <path d="M42 35H53" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 41H53" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 47H48" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  images: (
    <>
      <path d="M39.4561 50.6329C38.412 50.6311 37.3948 50.3079 36.5476 49.7088C35.7004 49.1098 35.0658 48.265 34.7331 47.2934L34.6864 47.1429C34.537 46.684 34.4593 46.2056 34.4557 45.7238V36.7985L31.2208 47.3995C31.0228 48.1538 31.1343 48.9543 31.5313 49.6288C31.9283 50.3032 32.5791 50.7978 33.3436 51.006L53.9626 56.427C54.22 56.4924 54.4774 56.5238 54.7307 56.5238C56.0588 56.5238 57.2723 55.6585 57.6123 54.3835L58.8137 50.6329H39.4561ZM43.1231 36.8875C44.5939 36.8875 45.79 35.7132 45.79 34.2693C45.79 32.8254 44.5939 31.6511 43.1231 31.6511C41.6523 31.6511 40.4562 32.8254 40.4562 34.2693C40.4562 35.7132 41.6523 36.8875 43.1231 36.8875Z" fill="white" />
      <path d="M59.7913 27.7239H39.7897C38.9059 27.7249 38.0586 28.0701 37.4336 28.6836C36.8087 29.2971 36.4571 30.1289 36.4561 30.9966V45.3966C36.4561 47.2005 37.9522 48.6693 39.7897 48.6693H59.7913C61.6288 48.6693 63.1249 47.2005 63.1249 45.3966V30.9966C63.1249 29.1927 61.6288 27.7239 59.7913 27.7239ZM39.7897 30.3421H59.7913C59.9681 30.3421 60.1377 30.411 60.2627 30.5338C60.3878 30.6565 60.458 30.823 60.458 30.9966V40.2898L56.2457 35.4645C56.0229 35.2134 55.7483 35.0117 55.44 34.8728C55.1316 34.734 54.7967 34.6613 54.4575 34.6594C54.1172 34.6612 53.7813 34.736 53.4736 34.8787C53.1658 35.0214 52.8936 35.2285 52.676 35.4855L47.7236 41.3214L46.1102 39.7413C45.6714 39.3113 45.0767 39.0697 44.4567 39.0697C43.8367 39.0697 43.242 39.3113 42.8032 39.7413L39.1229 43.3531V30.9966C39.1229 30.823 39.1932 30.6565 39.3182 30.5338C39.4433 30.411 39.6128 30.3421 39.7897 30.3421Z" fill="white" />
    </>
  ),
  video: (
    <>
      <rect x="33" y="30" width="29" height="24" rx="4" fill="white" />
      <path d="M44 38V48L52 43L44 38Z" fill="currentColor" />
    </>
  ),
  others: (
    <>
      <circle cx="47.5" cy="42" r="13" fill="white" />
      <path d="M47.5 35C47.5 35 55 42 47.5 49C40 42 47.5 35 47.5 35Z" fill="currentColor" />
      <path d="M41 42C41 42 47.5 34.5 54 42C47.5 49.5 41 42 41 42Z" fill="currentColor" />
    </>
  ),
}

const Dashboardbox = ({ icon, title, size, lastUpdateTime, iconColor = '#56B8FF', iconType = 'images', onClick }) => {
  // Unique filter ID to avoid SVG conflicts when rendering multiple cards
  const filterId = `filter_${iconType}_${title?.replace(/\s/g, '') || 'default'}`

  return (
    <div className="relative w-full mt-6 font-['Poppins',sans-serif] group cursor-pointer" onClick={onClick}>
      {/* Floating icon — positioned to overlap the top-left corner */}
      <div className="absolute -top-5 -left-5 z-10 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110">
        {icon || (
          <svg width="60" height="60" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: iconColor }}>
            <g opacity="0.4" filter={`url(#${filterId})`}>
              <circle cx="47.125" cy="47.125" r="33" fill={iconColor} />
            </g>
            <circle cx="47.125" cy="42.125" r="33" fill={iconColor} />
            {iconPaths[iconType] || iconPaths.images}
            <defs>
              <filter id={filterId} x="0" y="0" width="94.25" height="94.25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="7.0625" result="effect1_foregroundBlur" />
              </filter>
            </defs>
          </svg>
        )}
      </div>

      {/* Card body */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden transition-all duration-300 ease-out group-hover:shadow-xl group-hover:shadow-black/10 group-hover:-translate-y-1">
        {/* Curved background header */}
        <div className="relative h-[70px]">
          <svg
            className="absolute top-0 left-0 w-full"
            viewBox="0 0 220 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0H220V45C220 45 180 70 110 70C40 70 0 45 0 45V0Z"
              fill="#EDF2F7"
            />
          </svg>
          {/* Size text — positioned top-right over the curved bg */}
          <span className="absolute top-4 right-5 text-[#333F4E] text-lg font-medium">
            {size || '20 GB'}
          </span>
        </div>

        {/* Card content */}
        <div className="flex flex-col items-center px-5 pt-5 pb-5">
          {/* Title */}
          <h3 className="text-[#333F4E] text-base font-semibold mb-3 transition-colors duration-200 group-hover:text-[#1a202c]">
            {title || 'Images'}
          </h3>

          {/* Divider */}
          <div className="w-[75%] mb-3 transition-all duration-300 group-hover:w-[85%]" style={{ border: '0.3px solid #A3B2C7' }}></div>

          {/* Last update label */}
          <p className="text-[#A3B2C7] text-base mb-1">Last update</p>

          {/* Timestamp */}
          <p className="text-[#333F4E] text-base">
            {lastUpdateTime || '10:15am, 10 Oct'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboardbox
