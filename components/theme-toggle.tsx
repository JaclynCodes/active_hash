"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="h-9 w-9 relative group transition-all duration-300 ease-in-out overflow-hidden
          hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 
          dark:hover:bg-gradient-to-r dark:hover:from-purple-900/20 dark:hover:to-pink-900/20
          hover:shadow-md hover:shadow-purple-100/50 dark:hover:shadow-purple-900/20
          hover:scale-105 active:scale-95
          border border-transparent hover:border-purple-200/50 dark:hover:border-purple-700/50
          dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300"
      >
        {/* Sun Icon with elaborate animations */}
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

        {/* Moon Icon with elaborate animations */}
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

        {/* Transition overlay effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-slate-300/20 
          opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-md"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <style jsx>{`
        @keyframes sunRay {
          0%, 100% { 
            opacity: 0.4; 
            transform: translate(-50%, -50%) rotate(${0}deg) translateY(-8px) scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: translate(-50%, -50%) rotate(${0}deg) translateY(-10px) scale(1.2);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.5);
          }
        }
        
        @keyframes moonPhase {
          0% { 
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
          25% { 
            transform: rotate(90deg) scale(0.8);
            opacity: 0.7;
          }
          50% { 
            transform: rotate(180deg) scale(0.6);
            opacity: 0.4;
          }
          75% { 
            transform: rotate(270deg) scale(0.8);
            opacity: 0.7;
          }
          100% { 
            transform: rotate(360deg) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
