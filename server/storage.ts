import { users, type User, type InsertUser, type UpdateUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: UpdateUser): Promise<User | undefined>;
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    
    // Generate student ID
    const studentId = `ST-${year}-${id.toString().padStart(4, '0')}`;
    
    // Generate avatarInitials from fullName
    const nameParts = insertUser.fullName.split(' ');
    const avatarInitials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : nameParts[0].substring(0, 2);
    
    const user: User = { 
      ...insertUser, 
      id,
      studentId,
      joinedDate: `${month} ${year}`,
      avatarInitials: avatarInitials.toUpperCase(),
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updateUser: UpdateUser): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    
    if (!existingUser) {
      return undefined;
    }
    
    // If fullName is being updated, update the initials as well
    let avatarInitials = existingUser.avatarInitials;
    if (updateUser.fullName) {
      const nameParts = updateUser.fullName.split(' ');
      avatarInitials = nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
        : nameParts[0].substring(0, 2);
      avatarInitials = avatarInitials.toUpperCase();
    }
    
    const updatedUser: User = {
      ...existingUser,
      ...updateUser,
      avatarInitials
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();
