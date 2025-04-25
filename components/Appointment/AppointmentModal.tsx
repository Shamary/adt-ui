import { useState } from "react";

const AppointmentModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Set Appointment
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-4">Schedule Delivery</h2>

            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Delivery Address</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Delivery Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Preferred Time</label>
                <input
                  type="time"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentModal;
