import React, { useState, useEffect } from "react";

interface EditModalProps {
  open: boolean;
  initialData: { name: string; value: number }[];
  onClose: () => void;
  onSave: (email: string, newData: { name: string; value: number }[]) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  initialData,
  onClose,
  onSave,
}) => {
  const [email, setEmail] = useState("");
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleValueChange = (index: number, newValue: number) => {
    const updated = [...data];
    updated[index].value = newValue;
    setData(updated);
  };

  const handleSave = () => {
    if (!email) {
      alert("Please enter your email before saving!");
      return;
    }
    onSave(email, data);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Call Data</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg w-full p-2"
            placeholder="your@email.com"
          />
        </div>

        <div className="space-y-2 mb-4">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{item.name}</span>
              <input
                type="number"
                value={item.value}
                onChange={(e) =>
                  handleValueChange(index, Number(e.target.value))
                }
                className="border border-gray-300 rounded-lg p-1 w-20 text-center"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Save & Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
