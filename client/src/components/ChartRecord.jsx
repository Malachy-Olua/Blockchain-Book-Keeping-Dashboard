import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { cardStyles } from "./CardStyle";
import { DashBoardContext } from "../context/DashBoardContext";


export default function ChartRecord() {

  const { chartRecord, record } = useContext(DashBoardContext);

  const data = chartRecord.map((transaction)=>({
    data: parseFloat(transaction.moneyIn)
  }));

  return (
    <Section>
      <div className="cover">
        <div className="details">
          <h5>Cash Inflow</h5>
          <h2>{record}<span style={{fontSize:"1rem"}}>ETH</span></h2>
          
          
          <div className="increase">
            <span>+3.5%</span>
          </div>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip cursor={false} />
            <Area
              animationBegin={800}
              animationDuration={2000}
              type="monotone"
              dataKey="data"
              stroke="red"
              fill="#4d5155"
              strokeWidth={4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyles}
  padding: 2rem 0 0 0;
  .cover {
    .details {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      h1 {
        font-size: 2rem;
      }
      .increase {
        background-color: #89929b;
        padding: 0.5rem;
        border-radius: 1rem;
        transition: 0.3s ease-in-out;
        // &:hover {
        //   background-color: #ffc107;
        //   span {
        //     color: black;
        //   }
        // }
        span {
          color: white;
        }
      }
    }
  }
  .chart {
    height: 70%;
    .recharts-default-tooltip {
      background-color: black !important;
      border-color: black !important;
      
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
