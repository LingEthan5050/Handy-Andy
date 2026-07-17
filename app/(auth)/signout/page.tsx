import { Suspense } from "react";
import SignOutContent from "./SignOutContent";

export default function SignOutPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-(--cream)">
                    <div className="text-stone-600 animate-pulse">
                        Signing out...
                    </div>
                </div>
            }
        >
            <SignOutContent />
        </Suspense>
    );
}