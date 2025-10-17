import React, { useState, useEffect } from "react";
import CallsChart from "../ui/CallsChart";
import EditModal from "../ui/Editmodel";
import { supabase } from "../lib/supabaseClient";

const Dashboard: React.FC = () => {
  const [data, setData] = useState([
    { name: "Agent A", value: 100 },
    { name: "Agent B", value: 200 },
    { name: "Agent C", value: 150 },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = async (email: string, newData: any[]) => {
    setData(newData);
    await supabase.from("chart_values").upsert({ email, values: newData });
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#f8fbff] p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Call Duration Analysis</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit Chart
          </button>
        </div>
        <CallsChart data={data} />
      </div>

      <div className="bg-[#f8fbff] p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Sad Path Analysis</h2>
        <p className="text-gray-600">Pie chart coming soon...</p>
      </div>

      {modalOpen && (
        <EditModal
          open={modalOpen}
          initialData={data}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
