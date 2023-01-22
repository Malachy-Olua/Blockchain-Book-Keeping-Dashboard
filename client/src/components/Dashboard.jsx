import React, { useEffect } from "react";
import styled from "styled-components";
import Statistics from "./Statistics";
import ChartRecord from "./ChartRecord";
import CashIn from "./CashIn";
import Navbar from "./Navbar";
import Grandida from "./Grandida";
import Spent from "./Spent";
import scrollreveal from "scrollreveal";


export default function Dashboard() {
  useEffect(() => {
    const Reveal = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    Reveal.reveal(
      `
        nav,
        .space__first,
        .space__second
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);
  return (
    <Section>
      <Navbar />
      <div className="flex">
        <div className="space__first">
          <Statistics />
          <CashIn />
        </div>
        <div className="space__second">
          <ChartRecord />
          <Spent />
          <Grandida />
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .flex  {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .space__first {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .space__second {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .flex {
      .space__first,
      .space__second {
        grid-template-columns: 1fr;
      }
    }
  }
`;
