import { useEffect, useState } from 'react';
import axios from 'axios';
import axisoInstance from '../helper/AxiosInstance';

const AdminDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [deliveryUsers, setDeliveryUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchShipments = async () => {
    const res = await axisoInstance.get('/shipment/allShipment', { withCredentials: true });
    setShipments(res.data.shipments);
  };

  const fetchDeliveryPersonnel = async () => {
    const res = await axisoInstance.get('/shipment/delivery', { withCredentials: true });
    setDeliveryUsers(res.data.users);
  };


  const assignDelivery = async (shipmentId, deliveryId) => {
    try {
      await axisoInstance.put(
        `/shipment/${shipmentId}/assignShipment`,
        { deliveryId },
        { withCredentials: true }       
      );
      setMessage('Delivery person assigned!');
      fetchShipments();
    } catch {
      setMessage('Assignment failed');
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchDeliveryPersonnel();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>
      {message && <p className="mb-4 text-green-600 text-center">{message}</p>}

      {shipments.length === 0 ? (
        <p>No shipments found.</p>
      ) : (
        <ul className="space-y-4">
          {shipments.map((s) => (
            <li key={s._id} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>Recipient:</strong> {s.recipient}</p>
              <p><strong>Address:</strong> {s.address}</p>
              <p><strong>Status:</strong> {s.status}</p>
              <p>
                <strong>Delivery:</strong> {s.assignedTo ? s.assignedTo.name : 'Not assigned'}
              </p>

              <div className="mt-2">
                <label className="block mb-1">Assign Delivery Personnel:</label>
                <select
                  className="border p-2 rounded w-full sm:w-1/2"
                  onChange={(e) => assignDelivery(s._id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select Delivery Person</option>
                  {deliveryUsers.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
