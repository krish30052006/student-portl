import { Link, useLocation } from "wouter";
import { User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
};

function NavItem({ href, icon, children, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <a 
        className={cn(
          "flex items-center px-4 py-3 transition-colors",
          isActive 
            ? "text-primary-700 bg-primary-50 border-l-4 border-primary-500" 
            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border-l-4 border-transparent"
        )}
      >
        <span className="mr-3">{icon}</span>
        {children}
      </a>
    </Link>
  );
}

export function DashboardSidebar() {
  const [location] = useLocation();

  return (
    <div className="md:w-64 mb-6 md:mb-0">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <h2 className="font-medium text-lg text-neutral-900">Dashboard</h2>
        </div>
        <nav className="py-2">
          <NavItem 
            href="/profile" 
            icon={<User className="h-5 w-5" />}
            isActive={location === "/profile" || location === "/"}
          >
            Profile
          </NavItem>
          <NavItem 
            href="/settings" 
            icon={<Settings className="h-5 w-5" />}
            isActive={location === "/settings"}
          >
            Settings
          </NavItem>
        </nav>
      </div>
    </div>
  );
}

export function MobileDashboardNavigation() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-4 py-2">
      <div className="flex justify-around items-center">
        <Link href="/profile">
          <a className={cn(
            "flex flex-col items-center px-3 py-2",
            location === "/profile" || location === "/" ? "text-primary-700" : "text-neutral-600"
          )}>
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </a>
        </Link>
        <Link href="/settings">
          <a className={cn(
            "flex flex-col items-center px-3 py-2",
            location === "/settings" ? "text-primary-700" : "text-neutral-600"
          )}>
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </a>
        </Link>
        <button 
          className="flex flex-col items-center px-3 py-2 text-neutral-600"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="h-6 w-6" />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </div>
  );
}
