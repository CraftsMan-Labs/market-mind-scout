import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const DashboardNav = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="border-b border-gray-800 bg-black">
      <div className="flex h-16 items-center px-4">
        <Menu className="md:hidden h-6 w-6 text-gray-400" />
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 bg-gray-900 border-gray-800 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <User className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="border-gray-800 text-gray-300 hover:bg-gray-800"
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};