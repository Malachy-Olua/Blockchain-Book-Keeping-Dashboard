import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { SiEthereum } from 'react-icons/si';
import { IoStatsChart } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { cardStyles } from "./CardStyle";
import { DashBoardContext } from "../context/DashBoardContext";


export default function Statistics() {


  const { spentMonthly, transactions,record,ExpensesAmount } = useContext(DashBoardContext);


  return (
    <Section>
      <div className="analytic ">
        <div className="content">
          <h5>Monthly Spending</h5>
          <h3>{spentMonthly}<span style={{fontSize:"1rem"}}>ETH</span></h3>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <IoStatsChart />
        </div>
        <div className="content">
          <h5>Cash-In</h5>
          <h3>{record}<span style={{fontSize:"1rem"}}>ETH</span></h3>
          
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <SiEthereum />
        </div>
        <div className="content">
          <h5>Net Earning</h5>
          <h3>{(record-spentMonthly).toFixed(4)}<span style={{fontSize:"1rem"}}>ETH</span></h3>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Expenses</h5>
          <h3>{ExpensesAmount}<span style={{fontSize:"1rem"}}>ETH</span></h3>
        </div>
        <div className="logo">
          <FiActivity />
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {

      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
