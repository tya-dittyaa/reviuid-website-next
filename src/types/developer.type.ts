export type DeveloperRole =
  | "Team Leader"
  | "Frontend Developer"
  | "Backend Developer"
  | "UI/UX Designer"
  | "AI Prompter"
  | "Database Administrator"
  | "System Administrator";

export type Developer = {
  name: string;
  binusianId: string;
  email: string;
  avatar: string;
  role: DeveloperRole[];
};
