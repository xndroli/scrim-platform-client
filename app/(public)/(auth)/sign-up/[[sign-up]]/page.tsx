// app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4 sm:p-6 md:p-8">
      <SignUp appearance={{
        elements: {
          card: "shadow-lg bg-card",
          formButtonPrimary: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
          footerAction: "text-primary hover:underline",
        }
      }} />
    </div>
  );
}