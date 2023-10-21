import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'Twitter', url: 'https://www.twitter.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com' },
  ];

  return (
    <footer className="custome_grad text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac blandit velit.</p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>123 Main Street, City, Country</p>
            <p>info@example.com</p>
            <p>+1 234 567 890</p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="hover:text-white transition-colors duration-200">
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 py-4 bg-indigo-900 text-center">
        <p>&copy; {new Date().getFullYear()} Eng.Mohammad Ward, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;