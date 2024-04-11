import localFont from 'next/font/local'

export const fontGothan = localFont({
  variable: '--font-gothan',
  src: [
    {
      path: 'fonts/gotham-black.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/gotham-bold.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/gotham-book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/gotham-light.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})