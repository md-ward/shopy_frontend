import { Link } from 'react-router-dom';

const navigationLinks = [
  {
    to: '/admin/statistics',
    label: 'Statistics'
  },
  {
    to: '/admin/invoice-and-billing',
    label: 'Invoice and Billing'
  },
  {
    to: '/admin/add-products',
    label: 'Add Products'
  },
  // Add more objects for additional links
  {
    to: '/admin/orders',
    label: 'Orders'
  },
  {
    to: '/admin/customers',
    label: 'Customers'
  },
  {
    to: '/admin/inventory',
    label: 'Inventory'
  }
];

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col w-64 custome_grad text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="flex flex-col flex-grow gap-8 mt-8">
        {navigationLinks.map((link) => (
          <Link
            replace
            key={link.to}
            to={link.to}
            className="py-2 px-4 hover:bg-blue-600"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default DashboardSidebar;