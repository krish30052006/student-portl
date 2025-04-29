import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserSchema, UpdateUser } from "@shared/schema";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar, MobileDashboardNavigation } from "@/components/dashboard-sidebar";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Pencil, Check, X } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";

export default function ProfilePage() {
  const { user, updateProfileMutation } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  
  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      bio: user?.bio || "",
      program: user?.program || "Computer Science",
      yearOfStudy: user?.yearOfStudy || "1st Year",
    },
  });
  
  // Reset form when user data changes or edit mode is toggled
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName,
        email: user.email,
        bio: user.bio || "",
        program: user.program || "Computer Science",
        yearOfStudy: user.yearOfStudy || "1st Year",
      });
    }
  }, [user, isEditMode, form]);
  
  const onSubmit = (data: UpdateUser) => {
    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        setIsEditMode(false);
      },
    });
  };
  
  const handleCancel = () => {
    setIsEditMode(false);
    if (user) {
      form.reset({
        fullName: user.fullName,
        email: user.email,
        bio: user.bio || "",
        program: user.program || "Computer Science",
        yearOfStudy: user.yearOfStudy || "1st Year",
      });
    }
  };
  
  if (!user) return null;
  
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-neutral-100">
      <DashboardHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:space-x-6">
          <DashboardSidebar />
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                <h2 className="font-medium text-lg text-neutral-900">Profile Information</h2>
                
                {/* Edit/Save buttons */}
                <div>
                  {!isEditMode ? (
                    <Button 
                      onClick={() => setIsEditMode(true)}
                      variant="outline"
                      size="sm"
                      className="text-primary-700 bg-primary-50 hover:bg-primary-100"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={form.handleSubmit(onSubmit)}
                        variant="default"
                        size="sm"
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4 mr-1" />
                        )}
                        Save
                      </Button>
                      
                      <Button 
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {/* View Mode */}
                {!isEditMode && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center justify-start">
                      <UserAvatar user={user} className="h-32 w-32 text-4xl mb-4" />
                      <h3 className="text-lg font-medium text-neutral-900">{user.fullName}</h3>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                    </div>
                    
                    {/* Profile Details */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-medium text-neutral-900 mb-4">About</h3>
                      <p className="text-neutral-700 mb-6">
                        {user.bio || "No bio provided yet."}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-neutral-500 mb-1">Student ID</h4>
                          <p className="text-neutral-900">{user.studentId}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-neutral-500 mb-1">Program</h4>
                          <p className="text-neutral-900">{user.program}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-neutral-500 mb-1">Year of Study</h4>
                          <p className="text-neutral-900">{user.yearOfStudy}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-neutral-500 mb-1">Joined</h4>
                          <p className="text-neutral-900">{user.joinedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Edit Mode */}
                {isEditMode && (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center justify-start">
                          <UserAvatar user={user} className="h-32 w-32 text-4xl mb-4" />
                          
                          <div className="w-full space-y-4">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        {/* Profile Details */}
                        <div className="md:col-span-2 space-y-4">
                          <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>About</FormLabel>
                                <FormControl>
                                  <textarea 
                                    className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" 
                                    rows={4}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <FormLabel className="text-sm font-medium text-neutral-500">Student ID</FormLabel>
                              <Input 
                                value={user.studentId} 
                                disabled 
                                className="bg-neutral-50"
                              />
                              <p className="mt-1 text-xs text-neutral-500">Student ID cannot be changed</p>
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="program"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Program</FormLabel>
                                  <FormControl>
                                    <select 
                                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                                      {...field}
                                    >
                                      <option value="Computer Science">Computer Science</option>
                                      <option value="Information Technology">Information Technology</option>
                                      <option value="Software Engineering">Software Engineering</option>
                                      <option value="Data Science">Data Science</option>
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="yearOfStudy"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year of Study</FormLabel>
                                  <FormControl>
                                    <select 
                                      className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                                      {...field}
                                    >
                                      <option value="1st Year">1st Year</option>
                                      <option value="2nd Year">2nd Year</option>
                                      <option value="3rd Year">3rd Year</option>
                                      <option value="4th Year">4th Year</option>
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div>
                              <FormLabel className="text-sm font-medium text-neutral-500">Joined</FormLabel>
                              <Input 
                                value={user.joinedDate} 
                                disabled 
                                className="bg-neutral-50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MobileDashboardNavigation />
    </div>
  );
}
