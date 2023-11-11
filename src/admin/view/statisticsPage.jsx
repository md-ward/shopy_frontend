// import AdminLayout from "../../global/view/admin_page_layout";


const StatisticsPage = () => {
    // Mock data for statistics
    const registeredUsers = 1234;
    const activeUsers = 567;
    const siteVisitors = 8901;
    const monthlySales = 50000;
    const weeklySales = 12000;
    const dailySales = 2000;

    return (


        <div className="fle w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Statistics</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-2">Registered Users</h2>
                    <p className="text-3xl font-bold">{registeredUsers}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-2">Active Users</h2>
                    <p className="text-3xl font-bold">{activeUsers}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-2">Site Visitors</h2>
                    <p className="text-3xl font-bold">{siteVisitors}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-2">Monthly Sales</h2>
                    <p className="text-3xl font-bold">${monthlySales}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-2">Weekly Sales</h2>
                    <p className="text-3xl font-bold">${weeklySales}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-lg font-semibold mb-2">Daily Sales</h2>
                    <p className="text-3xl font-bold">${dailySales}</p>
                </div>
            </div>
        </div>



    );
}

export default StatisticsPage;