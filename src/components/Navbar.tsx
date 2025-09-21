import { Building2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-surface-elevated border-b border-card-border sticky top-0 z-50 backdrop-blur-sm bg-surface-elevated/95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2.5 rounded-xl shadow-sm">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-heading">FibreX Directory</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;