const OrderManagement = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
      <div className="bg-white p-4 shadow-md rounded-lg">
        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Filter by Status</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Filter by Date</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Filter by Customer</button>
        </div>
        {/* Orders List */}
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through orders here */}
            <tr>
              <td className="p-2">#001</td>
              <td className="p-2">John Doe</td>
              <td className="p-2">Pending</td>
              <td className="p-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded">View</button>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
