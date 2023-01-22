import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { DashBoardContext } from "../context/DashBoardContext";

const Inpute = ({placeholder, name, type, value, onSearchChange}) =>(
  <input placeholder={placeholder} type={type} step='0.0001' value={value} 
  onChange={onSearchChange} 
  />
);


export default function Navbar() {

  const { spentMonthly, transactions,record,ExpensesAmount,onSearchChange, signAppOut } = useContext(DashBoardContext);

  const signOut = () =>{
     signAppOut();
     window.localStorage.removeItem('account');
     window.location.reload();
  }

  return (
    <Nav>
      <div className="head">
        <h4></h4>
        <h1>
         <span> Hi Gab, welcome to Grandida Dashboard</span>
        </h1>
      </div>
      <div className="cont">
        <div className="cont2">
          <button type="button" onClick={signOut} className="payment3">logout</button>
        </div>
        <div className="search">
          <BiSearch />
          <Inpute placeholder="Search" name="search" type="search" onSearchChange={onSearchChange}/>
        </div>
      </div>

    </Nav>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: white;
  .payment3{
    display:flex;
    align-items:center;
    border-radius: 0.3rem;
    height: 30px;
    border-style:none;
    text-align: center;
    margin-top: 9px;
    
    padding: 0.3rem 1rem;
    color:red;
    font-weight: 900;
    cursor:pointer;
    background:#4d5155;
    font-family: "Permanent Marker", cursive; 
  }



  .head {
    h1 {
      span {
        margin-left: 0.5rem;
        color: white;
        font-family: "Permanent Marker", cursive;
        letter-spacing: 0.2rem;
      }
    }
  }

  .cont{
    display: flex;
    align-items: center;
  }

  .cont2{
    margin-right:10px
  }

  .search {
    background-color: #4d5155;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: red;
    }
    input {
      background-color: transparent;
      border: none;
      color: red;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: red;
        font-family: "Permanent Marker", cursive;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .head {
      h1 {
        span {
          display: block;

          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
    .search{
      width:240.031px;
    }
  }
`;
