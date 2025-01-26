export const theme = {
  text: {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-900 dark:text-white",
    accent: "text-emerald-600 dark:text-emerald-400",
    muted: "text-gray-500 dark:text-gray-500",
  },
  background: {
    primary: "bg-white dark:bg-gray-900",
    secondary: "bg-gray-50 dark:bg-gray-800",
    accent: "bg-emerald-600 dark:bg-emerald-700",
    muted: "bg-gray-100 dark:bg-gray-800",
    card: "bg-white/80 dark:bg-gray-900/80",
  },
  border: {
    primary: "border-gray-200 dark:border-gray-800",
    accent: "border-emerald-600 dark:border-emerald-500",
  },
  hover: {
    text: "hover:text-emerald-600 dark:hover:text-emerald-400",
    bg: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
} as const;
