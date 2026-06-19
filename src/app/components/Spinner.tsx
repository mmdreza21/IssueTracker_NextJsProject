import { Box } from "@radix-ui/themes";
import classNames from "classnames";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?:
    | "accent"
    | "gray"
    | "white"
    | "blue"
    | "purple"
    | "emerald"
    | "rose"
    | "amber";
  className?: string;
}

function Spinner({ size = "sm", color = "white", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-10 w-10",
    lg: "h-14 w-14",
    xl: "h-20 w-20",
  };

  const ringSize = {
    sm: "border-2",
    md: "border-2",
    lg: "border-3",
    xl: "border-4",
  };

  const colorMap = {
    accent: "var(--accent-9)",
    gray: "#6b7280",
    white: "#ffffff",
    blue: "#2563eb",
    purple: "#7c3aed",
    emerald: "#059669",
    rose: "#e11d48",
    amber: "#d97706",
  };

  const colorValue = colorMap[color];

  return (
    <div
      className={classNames(
        "relative inline-flex items-center justify-center",
        sizeClasses[size],
        className,
      )}
      role="status"
    >
      {/* Outer ring */}
      <Box
        className={classNames(
          "absolute inset-0 animate-spin rounded-full border-solid",
          ringSize[size],
        )}
        style={{
          borderColor: `${colorValue}33`, // 20% opacity
        }}
      />

      {/* Inner ring with gradient */}
      <div
        className={classNames(
          "absolute inset-0.75 animate-spin rounded-full border-solid border-r-transparent border-l-transparent",
          ringSize[size],
          { "inset-1": size === "xl" },
          { "inset-0.5": size === "sm" },
        )}
        style={{
          animationDuration: "0.8s",
          borderTopColor: colorValue,
          borderBottomColor: `${colorValue}99`, // 60% opacity
        }}
      />

      {/* Center dot */}
      <div
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: colorValue,
        }}
      />

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
