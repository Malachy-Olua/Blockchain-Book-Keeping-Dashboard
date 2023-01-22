import React, { useState, useEffect, useContext } from "react";
import { DashBoardContext } from "../context/DashBoardContext";
import styled from "styled-components";
import { MdSpaceDashboard } from "react-icons/md";
import { FaAddressCard, FaTaxi } from "react-icons/fa";
import { GiTwirlCenter } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";


const Input = ({placeholder, name, type, value, handleChange}) =>(
  <input placeholder={placeholder} type={type} step='0.0001' value={value} 
  onChange={(e)=> handleChange(e, name)} 
  className="payment" 
  />
);

export default function Sidebar() {
  const [recentList, setrecentList] = useState(1);
  const [navbarState, setNavbarState] = useState(false);

  const { 
    connectWallet, 
    record_alert, 
    staff_alert, 
    expenses_alert, 
    currentAccount,
    recordSet, 
    formData,
    formData1,
    formData2, 
    sendStaffTransaction,
    sendExpensesTransaction, 
    handleChange,
    spentMonthly, 
    isLoading 
  } = useContext(DashBoardContext);

  //spentMonthly
  const payStaff = (e) =>{
    const { addressTo, moneyOut, staffName, moneyOutDescription } = formData;
  
    e.preventDefault();

    // getFormData();

    sendStaffTransaction();  

  }

  const expenses = (e) =>{
    const { addressTo, moneyOut, moneyOutDescription } = formData1;  

    e.preventDefault();

    // getFormData1();

    sendExpensesTransaction();  
  }

  const Record = (e) =>{
    const {  moneyIn, moneyInDescription } = formData2;

    e.preventDefault();

    // getFormData2();
    recordSet();

    //sendRecordTransaction();  
  }


  useEffect(() => {
    const Reveal = scrollreveal({
      origin: "left",
      distance: "78px",
      duration: 1000,
      reset: false,
    });

    Reveal.reveal(
      `
      .trademark,
      .order>ul>li:nth-of-type(1),
      .order>ul>li:nth-of-type(2),
      .order>ul>li:nth-of-type(3),
      .order>ul>li:nth-of-type(4),
      .order>ul>li:nth-of-type(5),
      .order>ul>li:nth-of-type(6),
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);

  return (
    <>
      <Section>
        <div className="cover">
          <div className="trademark">
            <span>Grandida</span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="order">
            <ul>
              <li
                className={recentList === 1 ? "active" : "none"}
                onClick={() => setrecentList(1)}
              >
                <a href="#">
                  <MdSpaceDashboard />
                  <span style={{color:"red", fontWeight:"bold"}}> Dashboard</span>
                </a>
              </li>
  
 

              <li
                className={recentList === 3 ? "active" : "none"}
                onClick={() => setrecentList(3)}
              >
                <a href="#">
                  <FaAddressCard />
                  <span> Money Out</span>
                </a>
                
                   <Input type="text" placeholder="Address To" name="addressTo" className="payment2"  handleChange={handleChange}></Input><br/>
                   {staff_alert || expenses_alert ?(
                        <div>
                          <p className="_p"><span style={{color:"red"}}>{staff_alert}</span></p>
                          <p className="_p"><span style={{color:"red"}}>{expenses_alert}</span></p>
                        </div>):(<div></div>)}
                   <Input step='0.0001' placeholder="Amount (ETH)" name="moneyOut" type="number"  handleChange={handleChange}/>
                   <Input placeholder="Staff Name" name="staffName" type="text"  handleChange={handleChange}/>
                   <Input placeholder="description" name="moneyOutDescription" type="text"  handleChange={handleChange}/>
              
                <div className="btn">
                  <button type="button" onClick={payStaff} className="payment2">Pay Staff</button>
                  <button type="button" onClick={expenses} className="payment2">Expenses</button>
                </div>

              </li>
              <li
                className={recentList === 4 ? "active" : "none"}
                onClick={() => setrecentList(4)}
              >
                <a href="#">
                  <GiTwirlCenter />
                  <span> Money In</span>
                </a>
                   <p className="_p"><span style={{color:"red"}}>{record_alert}</span></p>
                   <Input className="payment" step='0.0001' placeholder="Amount (ETH)" name="moneyIn" type="number"  handleChange={handleChange}/>
                   <Input className="payment" placeholder="Description" name="moneyInDescription" type="text"  handleChange={handleChange}/>

                <button type="button" onClick={Record} className="payment2">Record</button>

              </li>

            </ul>
          </div>
        </div>

        { currentAccount 
          ?( <div></div>) 
          : (         
        <div className="logout">
          <a href="#" onClick={connectWallet}>
            <FiLogOut />
              Connect      
          </a>
        </div>)}
      </Section>

      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__order">
          <ul>
            <li
              className={recentList === 1 ? "active" : "none"}
              
            >
              <a href="#">
                <MdSpaceDashboard />
                <span style={{color:"red", fontWeight:"bold"}}> Dashboard</span>
              </a>
            </li>
            <li
              className={recentList === 2 ? "active" : "none"}
             
            >
                <a href="#">
                  <FaAddressCard />
                  <span> Money Out</span>
                </a>
              <a href="#">
                <div className="responsive_form">
                   <Input type="text" placeholder="Address To" name="addressTo" handleChange={handleChange}></Input><br/>
                   <Input step='0.0001' placeholder="Amount (ETH)" name="moneyOut" type="number"  handleChange={handleChange}/><br/>
                   <Input placeholder="Staff Name" name="staffName" type="text"  handleChange={handleChange}/><br/>
                   <Input placeholder="description" name="moneyOutDescription" type="text"  handleChange={handleChange}/>
                </div>
              </a>
                <div className="btn">
                  <button type="button" onClick={payStaff} className="payment2">Pay Staff</button>
                  <button type="button" onClick={expenses} className="payment2">Expenses</button>
                </div>
            </li>

            <li
              className={recentList === 3 ? "active" : "none"}
              
            >
                <a href="#">
                  <GiTwirlCenter />
                  <span> Money In</span>
                </a>
                <a href="#">
                  <div  className="responsive_form">
                   <div  className="_p">
                     <p><span style={{color:"red"}}>{record_alert}</span></p>
                   </div> 
                  
                  <Input  step='0.0001' placeholder="Amount (ETH)" name="moneyIn" type="number"  handleChange={handleChange}/><br/>
                  <Input  placeholder="Description" name="moneyInDescription" type="text"  handleChange={handleChange}/>
                  </div>
                </a>
                <button type="button" onClick={Record} className="payment2">Record</button>
            </li>


            { currentAccount 
                  ?( <div></div>) 
                  : (         
                <div className="responsive_logout">
                  <a href="#" onClick={connectWallet}>
                    <FiLogOut />
                      Connect      
                  </a>
                </div>)}
          </ul>
        </div>
      </ResponsiveNav>
    </>
  );
}
const Section = styled.section`
  position: fixed;
  left: 0;
  background: rgb(58,59,60);
  background: linear-gradient(90deg, rgba(58,59,60,1) 11%, rgba(58,59,60,1) 100%);
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  ._p{
    z-index:2;
    position:relative;
    font-weight:700;
    font-size:10px;
  }
  .cover {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .trademark {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #45f3ff;
        font-family: "Permanent Marker", cursive;
      }
    }
    .order {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background: rgb(224,228,232);
            background: linear-gradient(90deg, rgba(224,228,232,1) 6%, rgba(224,228,232,1) 84%);
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background: rgb(224,228,232);
          background: linear-gradient(90deg, rgba(224,228,232,1) 6%, rgba(224,228,232,1) 84%);
          a {
            color: black;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    height:1.75rem;
    box-sizing:border-box;
   
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;  
     
    }
    
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
   

    gap:5px
  }

  .payment{
    border-radius: 10px;
    height: 30px;
    border-style:none;
    text-align: center;
    margin-top: 4px; 
  }

  .payment2{
    border-radius: 0.3rem;
    height: 30px;
    border-style:none;
    text-align: center;
    margin-top: 4px;
    padding: 0.3rem 1rem;
    color:red;
    font-weight: 900;
    cursor:pointer;
    svg {
      color: #ffc107;
    }
   
  }

  .btn{
    display:flex;
    gap:5px;
  }


  

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .responsive__order{
      display:flex;
      flex-direction: column;
    }
    responsive_form{
      display:flex;
      flex-direction: column;
    }

    .cover {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .trademark {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .cover > .order,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background: rgb(58,59,60);
  background: linear-gradient(90deg, rgba(58,59,60,1) 11%, rgba(58,59,60,1) 100%);
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .payment{
    border-radius: 5px;
    height: 30px;
    border-style:none;
    text-align: center;
    margin-top: 2px; 
    width:100%;
  }
  .payment2{
    border-radius: 0.3rem;
    height: 30px;
    border-style:none;
    text-align: center;
    margin-top: 4px;
    padding: 0.125rem ;
    color:red;
    font-weight: 900;
    font-size:10px;
    width:60px;
    cursor:pointer;
    svg {
      color: #ffc107;
    }
  }
  .btn{
    display:flex;
    gap:5px;
  }
  .responsive_logout {
    padding: 0.3rem 1rem;
    height:1.75rem;
    box-sizing:border-box;
   
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;  
     
    }
    
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
   

    gap:5px
  }  
  .responsive__order {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background: rgb(224,228,232);
          background: linear-gradient(90deg, rgba(224,228,232,1) 6%, rgba(224,228,232,1) 84%);
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background: rgb(224,228,232);
        background: linear-gradient(90deg, rgba(224,228,232,1) 6%, rgba(224,228,232,1) 84%);
        a {
          color: black;
        }
      }
    }
  }
`;
