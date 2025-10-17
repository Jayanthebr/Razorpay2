import React from "react";
import Dashboard from "../src/pages/Dashboard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f6fbff] flex justify-center items-start py-10">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center text-blue-500 mb-8">
          Call Analytics Dashboard
        </h1>
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
