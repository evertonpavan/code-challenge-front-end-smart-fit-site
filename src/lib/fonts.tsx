import localFont from 'next/font/local'

export const fontGothan = localFont({
  variable: '--font-gothan',
  src: [
    {
      path: '../../public/fonts/gotham-black.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/gotham-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/gotham-book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/gotham-light.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})