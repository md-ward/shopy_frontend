import Layout from "../../global/view/pages_layout";

const UserOrderLogs = () => {
    // Sample data for order logs
    const orderLogs = [
        { id: 1, orderNumber: "ORD001", date: "2023-10-28", status: "Delivered" },
        { id: 2, orderNumber: "ORD002", date: "2023-10-27", status: "In Progress" },
        { id: 3, orderNumber: "ORD003", date: "2023-10-25", status: "Delivered" },
        { id: 4, orderNumber: "ORD004", date: "2023-10-24", status: "Cancelled" },
        { id: 1, orderNumber: "ORD001", date: "2023-10-28", status: "Delivered" },
        { id: 2, orderNumber: "ORD002", date: "2023-10-27", status: "In Progress" },
        { id: 3, orderNumber: "ORD003", date: "2023-10-25", status: "Delivered" },
        { id: 4, orderNumber: "ORD004", date: "2023-10-24", status: "Cancelled" },
        { id: 1, orderNumber: "ORD001", date: "2023-10-28", status: "Delivered" },
        { id: 2, orderNumber: "ORD002", date: "2023-10-27", status: "In Progress" },
        { id: 3, orderNumber: "ORD003", date: "2023-10-25", status: "Delivered" },
        { id: 4, orderNumber: "ORD004", date: "2023-10-24", status: "Cancelled" },
    ];

    function statusColor(status) {

        switch (status) {
            case 'Delivered':
                return 'text-green-600'
            case 'In Progress':
                return 'text-blue-600'
            case 'Cancelled':
                return 'text-red-600'




        }

    }


    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center mb-10 mt-5 text-lg font-bold text-indigo-600">Order Logs</h2>
                {orderLogs.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border bg-gray-200 text-gray-600 font-bold uppercase">Order Number</th>
                                <th className="py-2 px-4 border bg-gray-200 text-gray-600 font-bold uppercase">Date</th>
                                <th className="py-2 px-4 border bg-gray-200 text-gray-600 font-bold uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderLogs.map((order) => (
                                <tr key={order.id}>
                                    <td className="py-2 px-4 border">{order.orderNumber}</td>
                                    <td className="py-2 px-4 border">{order.date}</td>
                                    <td className={`py-2 px-4 border ${statusColor(order.status )}`}>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No order logs available.</p>
                )}
            </div>
        </Layout>
    );
};

export default UserOrderLogs;