import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar, MobileDashboardNavigation } from "@/components/dashboard-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Key, 
  ShieldAlert, 
  EyeOff, 
  Brush, 
  Monitor, 
  Sun, 
  Moon 
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  
  // Placeholder settings
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
  });
  
  if (!user) return null;
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-neutral-100">
      <DashboardHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:space-x-6">
          <DashboardSidebar />
          
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary-600" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Browser Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via browser
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.browser} 
                    onCheckedChange={(checked) => setNotifications({...notifications, browser: checked})}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary-600" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Password</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Last changed 3 months ago
                  </p>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-1">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brush className="h-5 w-5 text-primary-600" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize the appearance of the application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Theme</h4>
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        variant={theme === 'light' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setTheme('light')}
                        className="flex items-center gap-2"
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </Button>
                      
                      <Button 
                        variant={theme === 'dark' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className="flex items-center gap-2"
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </Button>
                      
                      <Button 
                        variant={theme === 'system' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setTheme('system')}
                        className="flex items-center gap-2"
                      >
                        <Monitor className="h-4 w-4" />
                        System
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <ShieldAlert className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground border-t pt-4">
                Note: This action cannot be undone. All your data will be permanently deleted.
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <MobileDashboardNavigation />
    </div>
  );
}
