"use client"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="w-full flex flex-col align-middle justify-center text-center mt-10 items-center gap-5">
        <p className="text-xl font-semibold">
          GO to <span className="text-2xl font-bold">/invoices</span> please{" "}
        </p>
        <p>OR</p>
        <button
          onClick={() => router.push("/invoices")}
          className="border-2 shadow-lg bg-slate-400 py-2 px-2 rounded-md w-fit"
        >
          Go to Dashboard
        </button>
      </div>
    </>
  );
}
