import {Geist, Geist_Mono} from "next/font/google";
import Header from "../components/header";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "NextPod",
    description: "Album DB creates using NextJS",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header/>
        <main className="min-h-screen bg-gray-100">
            {children}
        </main>
        </body>
        </html>
    );
}
