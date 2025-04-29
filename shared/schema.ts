import { pgTable, text, serial, integer, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  bio: text("bio"),
  studentId: text("student_id"),
  program: text("program"),
  yearOfStudy: text("year_of_study"),
  joinedDate: text("joined_date"),
  avatarInitials: text("avatar_initials"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  avatarInitials: true,
  studentId: true,
  joinedDate: true,
});

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = createInsertSchema(users).omit({
  id: true,
  password: true,
  username: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
