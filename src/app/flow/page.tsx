import React, { Suspense } from "react";
import FlowChart from "./components/FlowChart";

export default async function page() {
  // const response = await getStructuredDoc("44d43d1b-ece8-4dbf-919a-c626fbc658db")

  return (
    <main className="h-full flex-1">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        }
      >
        <FlowChart />
      </Suspense>
    </main>
  );
}
