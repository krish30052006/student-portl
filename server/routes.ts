import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Other application routes can be added here
  // prefixed with /api
  
  const httpServer = createServer(app);

  return httpServer;
}
