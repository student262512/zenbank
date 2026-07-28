"use client";

import React from "react";

import {
    Pie,
    PieChart,
    Sector,
    Tooltip,
    ResponsiveContainer,
    PieSectorShapeProps,
    Legend,
} from "recharts";

import {
    neonPiePalette,
} from "./chart-theme";


interface NeonRadialPieChartProps<T> {
    data: T[];
    dataKey: keyof T;
    nameKey: keyof T;
    height?: number;
}


// const RadialGradientSector = (
//     props: PieSectorShapeProps
// ) => {

//     const {
//         cx,
//         cy,
//         outerRadius,
//         index = 0,
//         isActive,
//     } = props;


//     const color =
//         neonPiePalette[index % neonPiePalette.length];


//     return (
//         <>

//             <defs>

//                 <radialGradient
//                     id={`pie-fill-${index}`}
//                     cx={cx}
//                     cy={cy}
//                     r={outerRadius}
//                     gradientUnits="userSpaceOnUse"
//                 >

//                     <stop
//                         offset="0%"
//                         stopColor={color}
//                         stopOpacity={0.15}
//                     />

//                     <stop
//                         offset="70%"
//                         stopColor={color}
//                         stopOpacity={0.65}
//                     />

//                     <stop
//                         offset="100%"
//                         stopColor={color}
//                         stopOpacity={1}
//                     />

//                 </radialGradient>


//                 <radialGradient
//                     id={`pie-border-${index}`}
//                     cx="50%"
//                     cy="50%"
//                 >

//                     <stop
//                         offset="0%"
//                         stopColor={color}
//                         stopOpacity={0}
//                     />

//                     <stop
//                         offset="100%"
//                         stopColor={color}
//                         stopOpacity={0.9}
//                     />

//                 </radialGradient>


//             </defs>


//             <Sector
//                 {...props}
//                 fill={`url(#pie-fill-${index})`}
//                 stroke={`url(#pie-border-${index})`}
//                 strokeWidth={isActive ? 6 : 2}
//             />

//         </>
//     );
// };

const RadialGradientSector = (
  props: PieSectorShapeProps & {
    payload?: {
      fill?: string;
    };
  }
) => {

  const {
    cx,
    cy,
    outerRadius,
    index = 0,
    isActive,
    payload,
  } = props;


//   const color = neonPiePalette[index % neonPiePalette.length];

  const color =
    payload?.fill ??
    neonPiePalette[index % neonPiePalette.length];


  return (
    <>
      <defs>

        <radialGradient
          id={`pie-fill-${index}`}
          cx={cx}
          cy={cy}
          r={outerRadius}
          gradientUnits="userSpaceOnUse"
        >

          <stop
            offset="0%"
            stopColor={color}
            stopOpacity={0.15}
          />

          <stop
            offset="70%"
            stopColor={color}
            stopOpacity={0.65}
          />

          <stop
            offset="100%"
            stopColor={color}
            stopOpacity={1}
          />

        </radialGradient>


        <radialGradient
          id={`pie-border-${index}`}
        >

          <stop
            offset="0%"
            stopColor={color}
            stopOpacity={0}
          />

          <stop
            offset="100%"
            stopColor={color}
            stopOpacity={1}
          />

        </radialGradient>

      </defs>


      <Sector
        {...props}
        fill={`url(#pie-fill-${index})`}
        stroke={`url(#pie-border-${index})`}
        strokeWidth={isActive ? 6 : 2}
      />

    </>
  );
};



export default function NeonRadialPieChart<T>({
    data,
    dataKey,
    nameKey,
    height = 300,
}: NeonRadialPieChartProps<T>) {


    return (

        <ResponsiveContainer
            width="100%"
            height={height}
        >


            <PieChart>


                <Pie
                    data={data}
                    dataKey={dataKey as string}
                    nameKey={nameKey as string}
                    innerRadius="35%"
                    outerRadius="75%"
                    paddingAngle={3}
                    shape={RadialGradientSector}
                    //  isActive={true}
                    //  activeShape={RadialGradientSector}
                    animationDuration={800}
                />


                <Tooltip
                    contentStyle={{
                        background: "#020617",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#fff",
                    }}
                />

                <Legend />

            </PieChart>


        </ResponsiveContainer>

    );

}