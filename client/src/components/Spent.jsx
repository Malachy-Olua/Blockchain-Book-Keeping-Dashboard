import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SiEthereum } from 'react-icons/si';
import { cardStyles } from "./CardStyle";
import { DashBoardContext } from "../context/DashBoardContext";

export default function Spent() {

  const { spentMonthly, transactions,record,ExpensesAmount,searchField } = useContext(DashBoardContext);

  const filteredTransactions = transactions.filter(transaction=>{
    return transaction.staffName.toLowerCase().includes(searchField.toLowerCase())
  });

  return (
    <Section>
      <div className="title">
        <h3>Your Transfers</h3>
      </div>
      <div className="transactions">
        {filteredTransactions.map((transaction) => {
          return (
            <div className="transaction">
              <div className="transaction__title">
                <div className="transaction__title__image">
                   <SiEthereum />
                </div>
                <div className="transaction__title__details">
                  <h4>{transaction.staffName}</h4>
                  <h5>{transaction.timestamp}</h5>
                </div>
              </div>
              <div className="transaction__amount">
                <span style={{fontSize:"0.8rem"}}>{transaction.moneyOut}</span>
              </div>
            </div>
          );
        })}
      </div>

    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height:400px;
  overflow-x:hidden;
  overflow-y:auto;
  .title {
    h3 {
      color: white;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
      text-align:center
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .transaction {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &__title {
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
        background-color: #da2b1f;
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
  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #ffc107;
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 375px) {
    .transactions {
      .transaction {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
