import {cn} from "@/lib/utils.ts";

type props = {
  variant?: string,
  className?: string
}

export default function ThrobbedIcon({variant = 'small', className = ''}: props) {

  let dimension = 'w-12 h-12 ';
  let circle = '12';
  let radius = '10';

  if (variant === 'small') {
    dimension = 'w-7 h-7 ';
    circle = '7';
    radius = '0';
  }

  return (
    <div className={cn("flex justify-center mt-20 items-center z-50 overflow-hidden opacity-75", className)}>
      <div className={dimension + "spinner-border animate-spin inline-block rounded-full"} role="status">
                  <span className="visually-hidden">
                      <svg
                        className={dimension + "animate-spin -inline-block w-12 h-12 border-4 rounded-full"}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx={circle}
                          cy={circle}
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                  </span>
      </div>
    </div>
  )
}