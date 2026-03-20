'use client'

interface Props {
  currentStep: number
  steps: string[]
}

export default function ProgressBar({ currentStep, steps }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center">
        {steps.map((label, i) => {
          const stepNum = i + 1
          const isActive = stepNum === currentStep
          const isCompleted = stepNum < currentStep

          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-nota-700 text-white shadow-sm ring-4 ring-nota-100'
                      : isCompleted
                      ? 'bg-nota-100 text-nota-700'
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={`text-xs mt-2 whitespace-nowrap transition-colors duration-200 ${
                    isActive
                      ? 'text-nota-700 font-semibold'
                      : isCompleted
                      ? 'text-nota-500 font-medium'
                      : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-4 mt-[-20px] rounded-full transition-colors duration-200 ${
                    isCompleted ? 'bg-nota-300' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
