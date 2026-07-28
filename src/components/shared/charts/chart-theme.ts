// components/charts/chart-theme.ts

/**
 * Primitive neon colors.
 * These are visual tokens, not business meanings.
 */
export const chartColors = {
  neonGreen: "#00FFA3",
  neonCyan: "#00E5FF",
  neonBlue: "#38BDF8",
  neonPurple: "#A855F7",
  neonPink: "#FF4DDE",
  neonRed: "#FF3366",
  neonOrange: "#FF8A00",
  neonYellow: "#FACC15",

  slate: "#64748B",
  grid: "#1E293B",
  axis: "#64748B",
  background: "#020617",
  text: "#CBD5E1",
};


/**
 * Reusable gradient definitions.
 * Named by visual appearance.
 */
export const chartGradients = {
  green: {
    id: "gradient-green",
    start: chartColors.neonGreen,
    end: "#00C97B",
  },

  cyan: {
    id: "gradient-cyan",
    start: chartColors.neonCyan,
    end: chartColors.neonBlue,
  },

  purple: {
    id: "gradient-purple",
    start: chartColors.neonPurple,
    end: "#6366F1",
  },

  pink: {
    id: "gradient-pink",
    start: chartColors.neonPink,
    end: "#EC4899",
  },

  red: {
    id: "gradient-red",
    start: chartColors.neonRed,
    end: "#BE123C",
  },

  orange: {
    id: "gradient-orange",
    start: chartColors.neonOrange,
    end: chartColors.neonYellow,
  },

  bluePurple: {
    id: "gradient-blue-purple",
    start: chartColors.neonBlue,
    end: chartColors.neonPurple,
  },

  slate: {
    id: "gradient-slate",
    start: "#64748B",
    end: "#334155",
  },
};


/**
 * Automatic colors for dynamic series.
 */
export const chartPalette = [
  chartColors.neonGreen,
  chartColors.neonCyan,
  chartColors.neonPurple,
  chartColors.neonPink,
  chartColors.neonOrange,
  chartColors.neonBlue,
];


/**
 * Optional semantic mapping.
 *
 * Components can use these instead of raw colors.
 */
export const financialChartTheme = {
  positive: {
    color: chartColors.neonGreen,
    gradient: chartGradients.green,
  },

  negative: {
    color: chartColors.neonRed,
    gradient: chartGradients.red,
  },

  forecast: {
    color: chartColors.neonPurple,
    gradient: chartGradients.purple,
  },

  information: {
    color: chartColors.neonCyan,
    gradient: chartGradients.cyan,
  },

  warning: {
    color: chartColors.neonOrange,
    gradient: chartGradients.orange,
  },
};

export const neonPiePalette = [
  "#00FFA3",
  "#00E5FF",
  "#A855F7",
  "#FF4DDE",
  "#FF8A00",
  "#38BDF8",
  "#FF3366",
];

export function addChartColors<T>(
 data:T[]
) {

return data.map(
(item,index)=>({
 ...item,
 fill:
 chartPalette[index % chartPalette.length]
})
);

}


// export const chartTheme = {
//   colors: {
//     green: "#00FFA3",
//     cyan: "#00E5FF",
//     purple: "#A855F7",
//     pink: "#FF4DDE",
//     red: "#FF3366",
//     orange: "#FF8A00",
//   },

//   gradients: {
//     greenFade: "gradient-neon-green",
//     cyanFade: "gradient-neon-cyan",
//     purpleFade: "gradient-neon-purple",
//     pinkFade: "gradient-neon-pink",
//     bluePurpleFade: "gradient-blue-purple",
//   },

//   palette: [
//     "#00FFA3",
//     "#00E5FF",
//     "#A855F7",
//     "#FF4DDE",
//     "#FF8A00",
//   ],
// };


// export const chartColors = {
//   emerald: "#00FFA3",
//   cyan: "#00E5FF",
//   purple: "#A855F7",
//   pink: "#FF4DDE",
//   red: "#FF3366",
//   orange: "#FF8A00",
//   blue: "#38BDF8",
//   slate: "#64748B",
// };

// // chart-theme.ts

// export const chartGradients = {
//   neonGreen: {
//     id: "gradient-neon-green",
//     start: "#00FFA3",
//     end: "#00C97B",
//   },

//   neonRed: {
//     id: "gradient-neon-red",
//     start: "#FF3366",
//     end: "#FF1744",
//   },

//   neonCyan: {
//     id: "gradient-neon-cyan",
//     start: "#00E5FF",
//     end: "#0284C7",
//   },

//   neonPurple: {
//     id: "gradient-neon-purple",
//     start: "#A855F7",
//     end: "#6366F1",
//   },

//   neonOrange: {
//     id: "gradient-neon-orange",
//     start: "#FF8A00",
//     end: "#FACC15",
//   },

//   neonBluePurple: {
//     id: "gradient-neon-blue-purple",
//     start: "#38BDF8",
//     end: "#A855F7",
//   },

//   neonPink: {
//     id: "gradient-neon-pink",
//     start: "#FF4DDE",
//     end: "#EC4899",
//   },

//   slate: {
//     id: "gradient-slate",
//     start: "#64748B",
//     end: "#334155",
//   },
// };