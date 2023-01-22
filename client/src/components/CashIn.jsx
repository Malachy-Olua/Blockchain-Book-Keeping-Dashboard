import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdCash } from "react-icons/io";
import { cardStyles } from "./CardStyle";
import { DashBoardContext } from "../context/DashBoardContext";


export default function CashIn() {

  const { spentMonthly, transactions,record,ExpensesAmount,searchField,chartRecord } = useContext(DashBoardContext);


  return (
    <Section>
      <div className="head">
        <h3>Information for Cash-In</h3>
      </div>
      <div className="transactions">
        {chartRecord.map((record) => {
          return (

            <div>
              <div className="transaction">
                <div className="transaction__head">
                  <div className="transaction__head__image">
                    {<IoMdCash />}
                  </div>
                  <div className="transaction__head__details">
                    <h4>{record.moneyInDescription}</h4> 
                  </div>
                </div>
                <div className="transaction__amount">
                  <span style={{fontSize:"0.8rem"}}>{record.moneyIn}</span>
                </div>
                <IoIosArrowForward />
            </div>
            <div className="divider"></div>
          </div>
    
          
          );
        })}
      </div>
    </Section>
  );
}
const Section = styled.section`
  ${cardStyles};
  overflow-x:hidden;
  overflow-y:auto;
  height:300px;
  .divider{
    height:1px;
    border-bottom:1px solid white
  }
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .transaction {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: flex-start;
      &__head {
        display: flex;
        gap: 1rem;
        &__image {
          img {
            height: 2.5rem;
            border-radius: 3rem;
          }
        }
        &__details {
        }
      }
      &__amount {
        margin-left:auto;
        background-color: #89929b;
        padding: 0.2rem 0.5rem;
        width: 4rem;
        border-radius: 1rem;
        text-align: center;
        transition: 0.3s ease-in-out;
        // &:hover {
        //   background-color: #ffc107;
        //   span {
        //     color: black;
        //   }
        }
        span {
          color: white;
        }
      }
    }
  }
  .head {
    h3 {
      color: white;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
  }
  .faqs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .faq {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .info {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      svg {
        font-size: 1.4rem;
      }
      &:nth-of-type(2) {
        border-top: 0.01rem solid #6c6e6e;
        border-bottom: 0.01rem solid #6c6e6e;
        padding: 0.8rem 0;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    svg {
      font-size: 2rem !important;
    }
  }
`;
