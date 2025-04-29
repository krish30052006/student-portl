import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";
import { UserAvatar } from "./user-avatar";

export function DashboardHeader() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-neutral-900">Student Portal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <span className="text-sm text-neutral-600 mr-2">
              {user?.fullName}
            </span>
            <UserAvatar user={user} className="h-8 w-8" />
          </div>
          <Button 
            variant="ghost"
            size="icon"
            aria-label="Logout"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
