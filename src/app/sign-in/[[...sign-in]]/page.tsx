import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303]">
      <SignIn
        afterSignInUrl="/foundations/initialize"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#0a0a0a] border border-white/8",
          },
        }}
      />
    </div>
  );
}
