import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      console.log("🔒 Verifying admin token...");

      const verifyTokenWithFallback = async () => {
        try {
          // First try the dedicated token verification endpoint
          const response = await fetch("/api/admin/verify-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 5000, // 5 second timeout
          } as any);

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.json();
          console.log("🔒 Token verification response:", data);

          if (data.success && data.authenticated) {
            console.log(
              "✅ Token valid, user authenticated as:",
              data.user?.username,
            );
            setIsAuthenticated(true);
          } else {
            console.log("❌ Token invalid, removing:", data.message);
            localStorage.removeItem("adminToken");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("❌ Primary token verification failed:", error.message);

          // Fallback: Try admin health check
          try {
            console.log("🔄 Trying fallback verification...");
            const healthResponse = await fetch("/api/admin/health");

            if (healthResponse.ok) {
              console.log("✅ Admin API is healthy, keeping user logged in");
              setIsAuthenticated(true);
            } else {
              throw new Error("Health check failed");
            }
          } catch (fallbackError) {
            console.error(
              "❌ Fallback verification failed:",
              fallbackError.message,
            );
            // Last resort: check if token looks valid (not expired locally)
            try {
              const tokenPayload = JSON.parse(atob(token.split(".")[1]));
              const currentTime = Date.now() / 1000;

              if (tokenPayload.exp && tokenPayload.exp > currentTime) {
                console.log(
                  "⚠️ Server unreachable but token appears valid, keeping user logged in",
                );
                setIsAuthenticated(true);
              } else {
                console.log("❌ Token expired, logging out");
                localStorage.removeItem("adminToken");
                setIsAuthenticated(false);
              }
            } catch (parseError) {
              console.log("❌ Could not parse token, logging out");
              localStorage.removeItem("adminToken");
              setIsAuthenticated(false);
            }
          }
        }
      };

      verifyTokenWithFallback();
    } else {
      console.log("❌ No admin token found");
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
