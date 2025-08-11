"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-6 py-20 text-center">
      <h1 className="text-7xl font-extrabold mb-6 tracking-wide">
        Introducing{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text animate-pulse">
          AION
        </span>
      </h1>

      <p className="max-w-xl text-lg text-gray-400 font-semibold mb-8">
        Your ultimate AI companion — master of programming, automation, real-time
        intelligence, and beyond. Crafted to understand, learn, and elevate your
        digital world like never before.
      </p>

      <button
        onClick={() => router.push("/user")}
        className="relative px-8 py-3 rounded-lg font-semibold text-lg text-black overflow-hidden bg-cyan-500 hover:bg-cyan-600 mb-8"
      >
        <span className="relative z-10">Get Started</span>
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-shine opacity-80 filter brightness-110"></span>
      </button>


      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shine {
          background-size: 200% 100%;
          animation: shine 3s linear infinite;
          z-index: 0;
        }
      `}</style>
    </main>
  );
}
