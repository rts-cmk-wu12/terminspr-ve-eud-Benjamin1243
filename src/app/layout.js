import "./globals.css"

export const metadata = {
  
  title: {
    default: "Landrup Dans",
    template: " %s | Landrup Dans"
  },
  description: "Vil du starte til dans, start hos laudrup dans min ven..",
  icons:{
    icon: "/next.svg"
  }
}
export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
