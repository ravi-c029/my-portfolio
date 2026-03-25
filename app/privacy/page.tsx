"use client";

import { useViewStore } from "@/store/useViewStore";
import { cn } from "@/lib/utils";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export default function PrivacyPolicy() {
  const isSpatialMode = useViewStore((state) => state.isSpatialMode);

  return (
    <div className={cn("max-w-4xl mx-auto py-20 px-6", isSpatialMode ? "font-mono text-cyan-50" : "text-neutral-900")}>
      <header className="mb-12 border-b border-neutral-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className={isSpatialMode ? "text-cyan-500" : "text-black"} size={32} />
          <h1 className="text-4xl font-bold tracking-tight uppercase">Privacy Policy</h1>
        </div>
        <p className="opacity-60 text-sm">Last Updated: March 16, 2026 // Compliant with IT Act 2000 & DPDPA 2023</p>
      </header>

      <section className="space-y-10 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">1. Data Collection & Consent</h2>
          <p className="opacity-80">We collect information that you voluntarily provide when you reach out for services. This includes your name, email address, and project details. By using this site, you consent to the collection of this data as per the Digital Personal Data Protection Act, 2023 of India.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">2. Purpose of Processing</h2>
          <p className="opacity-80">Your data is processed strictly for communication, project estimation, and service delivery. We do not sell, trade, or leak your personal identifiers to any third-party marketing agencies.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">3. Data Principal Rights</h2>
          <p className="opacity-80 mb-4">Under Indian Law, you have the following rights:</p>
          <ul className="list-disc pl-6 space-y-2 opacity-80">
            <li>Right to Access: You can request a copy of the data we hold.</li>
            <li>Right to Correction: You can ask us to update inaccurate info.</li>
            <li>Right to Erasure: You can request the deletion of your data once the purpose is served.</li>
          </ul>
        </div>

        <div className={cn("p-6 rounded-2xl border", isSpatialMode ? "bg-cyan-950/20 border-cyan-800" : "bg-neutral-50 border-neutral-200")}>
          <h2 className="text-sm font-bold mb-2 uppercase tracking-widest">Grievance Redressal</h2>
          <p className="text-sm opacity-70">If you have concerns regarding your data, reach out to the Grievance Officer:</p>
          <p className="text-sm font-bold mt-2">Ravi Kumar Keshari // ravi.keshari029@gmail.com</p>
        </div>
      </section>
    </div>
  );
}