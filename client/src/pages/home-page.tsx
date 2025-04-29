import { Redirect } from "wouter";

export default function HomePage() {
  // Redirect to profile page as the main page after login
  return <Redirect to="/profile" />;
}
