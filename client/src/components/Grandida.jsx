import React from "react";
import styled from "styled-components";
import image from "../assets/AMERICA.jpg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { cardStyles } from "./CardStyle";


export default function Grandida() {
  return (
    <Section>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="title">
        <h2>GRANDIDA LLC</h2>
        <h3>
          <HiOutlineLocationMarker /> Florida, USA
        </h3>
      </div>
      <div className="info">
        <div className="container">
          {new Date().toLocaleString()}
        </div>

      </div>
    </Section>
  );
}
const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .image {
    max-height: 10rem;
    overflow: hidden;
    border-radius: 20rem;
    img {
      height: 10rem;
      width: 10rem;
      object-fit: cover;
      border-radius: 20rem;
      transition: 0.5s ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  .title {
    text-align: center;
    h2,
    h3 {
      color: white;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
    h3 {
      letter-spacing: 0.2rem;
    }
    svg{
      color:red;
    }
  }
  .info {
    display: flex;
    gap: 1rem;
    .container {
      text-align: center;
    }
  }
`;
