"use client";

import { chartGradients } from "./chart-theme";


export function ChartGradients() {
  return (
    <defs>

      {Object.values(chartGradients).map((gradient) => (
        <linearGradient
          key={gradient.id}
          id={gradient.id}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >

          <stop
            offset="0%"
            stopColor={gradient.start}
            stopOpacity={0.55}
          />

          <stop
            offset="100%"
            stopColor={gradient.end}
            stopOpacity={0.05}
          />

        </linearGradient>
      ))}

    </defs>
  );
}


// import { chartGradients } from "./chart-theme";

// export function ChartGradients() {
//   return (
//     <defs>

//       {Object.values(chartGradients).map((gradient) => (
//         <linearGradient
//           key={gradient.id}
//           id={gradient.id}
//           x1="0"
//           y1="0"
//           x2="0"
//           y2="1"
//         >
//           <stop
//             offset="0%"
//             stopColor={gradient.start}
//             stopOpacity={0.45}
//           />

//           <stop
//             offset="100%"
//             stopColor={gradient.end}
//             stopOpacity={0.05}
//           />

//         </linearGradient>
//       ))}

//     </defs>
//   );
// }