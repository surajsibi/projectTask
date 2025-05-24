import { useEffect, useState } from 'react';
import axios from 'axios';
import axisoInstance from '../helper/AxiosInstance';

const DeliveryDashboard = () => {
  const [assignedShipments, setAssignedShipments] = useState([]);
  const [message, setMessage] = useState('');

  const fetchShipments = async () => {
    try {
      const res = await axisoInstance.get('/shipment/myDeliveries', { withCredentials: true });
      setAssignedShipments(res.data.shipments);
    } catch (err) {
      setMessage('Failed to load shipments');
    }
  };

  const markAsDelivered = async (id) => {
    try {
      await axisoInstance.put(`/shipment/${id}/markDelivered`, {}, { withCredentials: true });
      setMessage('Shipment marked as delivered!');
      fetchShipments(); // Refresh list
    } catch {
      setMessage('Failed to update status');
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Delivery Dashboard</h2>
      {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

      {assignedShipments.length === 0 ? (
        <p className="text-center">No assigned shipments yet.</p>
      ) : (
        <ul className="space-y-4">
          {assignedShipments.map((s) => (
            <li key={s._id} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>Recipient:</strong> {s.recipient}</p>
              <p><strong>Address:</strong> {s.address}</p>
              <p><strong>Details:</strong> {s.packageDetails}</p>
              <p><strong>Status:</strong> <span className="text-blue-600">{s.status}</span></p>

              {s.status !== 'Delivered' && (
                <button
                  onClick={() => markAsDelivered(s._id)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Mark as Delivered
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveryDashboard;
