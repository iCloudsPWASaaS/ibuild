import React, {useEffect, useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [valid, setValid] = useState(true);
  const handleError = () => {
    setDidError(true)
  }
const checkImage = (url:any) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};
  const { src, alt, style, className,srcSet, ...rest } = props
useEffect(() => {
  if (!src) return;

  checkImage(src).then((e:any) => setValid(e));
}, [src]);
  return didError ? (
    srcSet ?
  <img src={srcSet} alt={alt} className={className} style={style} {...rest} onError={handleError} />
    :
     <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img
  src={valid === false ? srcSet : src}
  alt={alt}
  className={className}
  style={style}
  {...rest}
  onError={handleError}
/>
    // <img src={valid ? src : srcSet} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
