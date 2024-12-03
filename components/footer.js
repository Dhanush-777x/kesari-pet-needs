const Footer = () => {
  return (
    <footer className="w-full bg-primary text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Footer Text */}
        <div className="text-sm">
          &copy; 2024 Kesari Pet Needs. All rights reserved.
        </div>

        {/* Footer Links */}
        <div className="space-x-6">
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/support" className="hover:underline">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
