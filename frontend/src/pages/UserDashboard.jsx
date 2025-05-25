import { useState, useEffect } from "react";
import axios from "axios";
import axisoInstance from "../helper/AxiosInstance";

const UserDashboard = () => {
  const [shipmentData, setShipmentData] = useState({
    recipient: "",
    pickup: "",
    delivery: "",
    packageType: "",
  });

  const [shipments, setShipments] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setShipmentData({ ...shipmentData, [e.target.name]: e.target.value });
  };

  const bookShipment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/shipment/book",
        shipmentData,
        { withCredentials: true }
      );

      setMessage("Shipment booked successfully!");
      setShipments([res.data.data, ...shipments]);
      console.log(shipments);
      setShipmentData({
        recipient: "",
        pickup: "",
        delivery: "",
        packageType: "",
      });
    } catch (err) {
      setMessage("Booking failed");
    }
  };

  const fetchShipments = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/v1/shipment/myShipment",
      { withCredentials: true }
    );
    console.log(res);
    setShipments(res.data.data);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Dashboard</h2>

      {message && <p className="mb-4 text-center text-green-600">{message}</p>}

      {/* Booking Form */}
      <form
        onSubmit={bookShipment}
        className="bg-white p-4 rounded-lg shadow mb-6 space-y-4"
      >
        <input
          type="text"
          name="recipient"
          placeholder="Recipient Name"
          className="w-full p-2 border rounded"
          value={shipmentData.recipient}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickup"
          placeholder="Pickup Address"
          className="w-full p-2 border rounded"
          value={shipmentData.pickup}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="delivery"
          placeholder="Delivery Address"
          className="w-full p-2 border rounded"
          value={shipmentData.delivery}
          onChange={handleChange}
          required
        />
        <textarea
          name="packageType"
          placeholder="Package Details"
          className="w-full p-2 border rounded"
          rows="3"
          value={shipmentData.packageType}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Book Shipment
        </button>
      </form>

      {/* Shipments List */}
      <div>
        <h3 className="text-xl font-semibold mb-2">My Shipments</h3>
        {shipments?.length === 0 ? (
          <p className="text-gray-600">No shipments yet.</p>
        ) : (
          <ul className="space-y-4">
            {shipments?.map((s) => (
              <li key={s._id} className="border rounded p-3 shadow-sm bg-white">
                <p>
                  <strong>Sender:</strong> {s?.userId?.name}
                </p>
                <p>
                  <strong>Pickup:</strong> {s.pickup}
                </p>
                <p>
                  <strong>Delivery:</strong> {s.delivery}
                </p>
                <p>
                  <strong>Details:</strong> {s.packageType}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-blue-600 font-medium">{s.status}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
