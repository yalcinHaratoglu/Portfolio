"use client"

import { Code2, Coffee, Monitor, Headphones, Keyboard } from "lucide-react"

export function AboutWorkspace() {
  return (
    <div className="relative">
      <div className="relative z-10">
        {/* Main Workspace Container */}
        <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-2xl relative overflow-hidden shadow-2xl">
          {/* Desk Surface */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800 to-gray-700"></div>

          {/* Monitor */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-48 h-32 bg-gray-900 rounded-lg border-4 border-gray-700 relative">
              {/* Screen */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 rounded-sm relative overflow-hidden">
                {/* Code Editor Interface */}
                <div className="absolute top-2 left-2 right-2">
                  {/* Window Controls */}
                  <div className="flex space-x-1 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>

                  {/* Code Lines */}
                  <div className="space-y-1">
                    <div className="h-1 bg-blue-400 w-3/4 rounded opacity-80"></div>
                    <div className="h-1 bg-green-400 w-1/2 rounded opacity-60"></div>
                    <div className="h-1 bg-yellow-400 w-2/3 rounded opacity-70"></div>
                    <div className="h-1 bg-purple-400 w-1/3 rounded opacity-50"></div>
                    <div className="h-1 bg-pink-400 w-3/5 rounded opacity-60"></div>
                  </div>
                </div>

                {/* Cursor Blink */}
                <div className="absolute bottom-8 left-6 w-px h-3 bg-white animate-pulse"></div>
              </div>

              {/* Monitor Stand */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-700 rounded-b-lg"></div>
            </div>
          </div>

          {/* Keyboard */}
          <div className="absolute bottom-8 left-1/2 -translate-x-[calc(50%+2rem)]">
            <div className="w-24 h-8 bg-gray-800 rounded-lg border border-gray-600 relative">
              <div className="absolute inset-1 grid grid-cols-8 gap-px">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="bg-gray-700 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Mouse */}
          <div className="absolute bottom-8 left-1/2 -translate-x-[calc(50%-2rem)]">
            <div className="w-4 h-6 bg-gray-800 rounded-full border border-gray-600"></div>
          </div>

          {/* Coffee Cup */}
          <div className="absolute bottom-12 right-8">
            <div className="w-6 h-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-full relative">
              <div className="absolute top-1 left-1 right-1 h-2 bg-amber-700 rounded-full"></div>
              <div className="absolute -right-1 top-2 w-2 h-3 border-2 border-amber-800 rounded-r-full"></div>
              {/* Steam */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-px h-2 bg-gray-400 opacity-60 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Headphones */}
          <div className="absolute top-8 right-8">
            <div className="w-8 h-8 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-600 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-gray-700 rounded-full border border-gray-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-700 rounded-full border border-gray-500"></div>
            </div>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-4 left-4 opacity-30">
            <Code2 className="h-6 w-6 text-blue-400 animate-pulse" />
          </div>
          <div className="absolute top-12 left-12 opacity-20">
            <Monitor className="h-4 w-4 text-green-400 animate-bounce" style={{ animationDelay: "1s" }} />
          </div>
          <div className="absolute bottom-20 left-4 opacity-25">
            <Keyboard className="h-5 w-5 text-purple-400 animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          {/* Ambient Lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/5 to-purple-500/10 pointer-events-none"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 border border-gray-300 dark:border-gray-600 rounded-full animate-spin"
        style={{ animationDuration: "20s" }}
      ></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg rotate-45 animate-pulse"></div>

      {/* Floating Tech Icons */}
      <div
        className="absolute -top-4 left-8 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg animate-bounce"
        style={{ animationDelay: "0.5s" }}
      >
        <Coffee className="h-5 w-5 text-amber-600" />
      </div>
      <div
        className="absolute -right-4 top-1/3 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg animate-bounce"
        style={{ animationDelay: "1.5s" }}
      >
        <Headphones className="h-5 w-5 text-purple-600" />
      </div>
    </div>
  )
}
