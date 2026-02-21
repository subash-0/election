import { Suspense } from "react";
import CompareContent from "./compare";

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        तुलना लोड हुँदैछ... (Loading Comparison...)
      </div>
    }>
      <CompareContent />
    </Suspense>
  )
}