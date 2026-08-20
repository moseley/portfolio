import type { Metadata } from "next";
import { Roboto_Condensed, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Jeremy Moseley — Full-Stack Engineer",
  description:
    "Jeremy Moseley is a full-stack engineer with 20+ years of shipping web, mobile, and cloud products. Based in Silicon Valley.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          .print-resume-page { display: none; }
          .print-only { display: none; }
          @media print {
            /* Fully unlock the scroll container so all sections flow to print */
            html, body {
              height: auto !important;
              max-height: none !important;
              overflow: visible !important;
            }
            .print-root {
              height: auto !important;
              max-height: none !important;
              overflow: visible !important;
              overflow-x: visible !important;
              overflow-y: visible !important;
              scroll-snap-type: none !important;
              display: block !important;
            }
            .print-snap {
              height: auto !important;
              max-height: none !important;
              overflow: visible !important;
              scroll-snap-align: none !important;
            }

            /* Resume pages always start on their own page */
            .print-resume-page {
              break-before: page;
            }

            /* Hide the navbar */
            header {
              display: none !important;
            }

            /* White backgrounds, dark text */
            * {
              background: white !important;
              background-image: none !important;
              color: #111 !important;
              box-shadow: none !important;
              backdrop-filter: none !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            h1, h2, h3 { text-shadow: none !important; }
            a { color: #1a0dab !important; text-decoration: underline !important; }
            .hpu-logo { filter: brightness(0) !important; opacity: 0.85 !important; }
            .print-hide { display: none !important; }
            .print-only { display: block !important; }

            /* Grid containers are atomic for print pagination — if they don't fully
               fit on the remaining page, the whole grid jumps to the next page,
               leaving a gap behind. Collapse to block so content flows naturally. */
            .print-stack {
              display: block !important;
            }

            /* Compact spacing to fit more content per page and minimize page breaks */
            section {
              padding-top: 0.3in !important;
              padding-bottom: 0.3in !important;
            }
            .mt-20 { margin-top: 0.25in !important; }
            .mt-12 { margin-top: 0.2in !important; }
            .mt-10 { margin-top: 0.2in !important; }
            .mb-20 { margin-bottom: 0.25in !important; }
            .mb-10 { margin-bottom: 0.2in !important; }
            .mb-8 { margin-bottom: 0.15in !important; }

            /* Resume pages — full bleed, one per printed page */
            .print-resume-page {
              display: block !important;
              width: 100%;
              padding: 0 !important;
              margin: 0 !important;
            }
            .print-resume-page img {
              display: block !important;
              width: 100% !important;
              height: auto !important;
              max-width: 100% !important;
            }
          }
        ` }} />
      </head>
      <body
        className={`${robotoCondensed.variable} ${robotoMono.variable} antialiased`}
      >
        {/* Background */}
        <div
          className="fixed inset-0 -z-10 transition-[background] duration-700"
          style={{ background: "var(--page-bg)" }}
        />
        {/* Film grain */}
        <div
          className="fixed inset-0 z-[-9] pointer-events-none"
          style={{
            opacity: 0.105,
            mixBlendMode: "multiply",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeColorMatrix type='matrix' values='7 0 0 0 -3 0 7 0 0 -3 0 0 7 0 -3 0 0 0 0 1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
            backgroundSize: "250px 250px",
          }}
        />
        {children}
      </body>
    </html>
  );
}
