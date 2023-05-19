/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { INode } from '../utils/interfaces';
import { setPath } from '../redux/nodesSlice';
import { motion } from "framer-motion"
import styled from "styled-components"

interface INodeComponent {
  node: INode;
  onClick?: () => void;
}

const Block = styled.div<{ active: string, state: string; }>`
      border-radius: 0.3125em;
      box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0px 0px inset, rgba(255, 255, 255, 0.05) 0 1px 0px 1px inset, rgba(0, 0, 0, 0.7) 0 1px 2px 0px, rgba(9, 9, 9, 0.6) 0 2px 3px 2px;
      background-color: #343434;
      background-image: linear-gradient(to bottom, rgba(78, 78, 78, 0.15) 0%, rgba(65, 65, 65, 0.15) 2%, rgba(59, 59, 59, 0.15) 5%, rgba(56, 56, 56, 0.15) 32%, rgba(54, 54, 54, 0.15) 33%, rgba(53, 53, 53, 0.15) 46%, rgba(51, 51, 51, 0.15) 47%, rgba(50, 50, 50, 0.15) 60%, rgba(48, 48, 48, 0.15) 61%, rgba(42, 42, 42, 0.15) 100%);
      background-size: 4px 4px;
      float: left;
      margin-right: 0.125em;
      padding: 0.375em 0.4375em;
      position: relative;
      display:flex;
      justify-content:center;
      align-items:center;
      width: 2em;
      height: 2em;
      margin:5px;
      &:hover {
        box-shadow: rgba(255, 255, 255, 0.05) 0 1px 0px 0px inset, rgba(255, 255, 255, 0.02) 0 1px 0px 1px inset, rgba(9, 9, 9, 0.5) 0 2px 2px 1px;
      }
      &:after{
        content: '';
        display: block;
        position: absolute;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.11) 69%, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 0) 100%);
        width: 100%;
        height: 1px;
        left: 0;
        top: 0;
      }
      ${({ active }) => active ?
    `
            	box-shadow: rgba(0, 0, 0, 0.4) 0 0 0 1px inset;
              background-color: #2d2d2d;
              background-image: linear-gradient(transparent 50%, #2e2e2e 50%);
              background-size: 2px 2px;
              &:hover{
                box-shadow: rgba(0, 0, 0, 0.4) 0 0 0 1px inset;
              }
              $::before{
                	content: '';
                  display: block;
                  position: absolute;
                  background-image: -webkit-radial-gradient(center, ellipse cover, rgba(41, 137, 216, 0.51) 0%, rgba(30, 87, 153, 0.01) 53%, rgba(30, 87, 153, 0) 54%, rgba(30, 87, 153, 0) 57%);
                  box-shadow: rgba(76, 190, 255, 0.02) 0 0 0px 3px inset;
                  top: -0.25em;
                  left: 10%;
                  width: 80%;
                  height: 0.375em;
              }
              &::after{
                	content: '';
                  display: block;
                  position: absolute;
                  background-image: -webkit-radial-gradient(center, ellipse cover, rgba(41, 137, 216, 0.51) 0%, rgba(30, 87, 153, 0.01) 53%, rgba(30, 87, 153, 0) 54%, rgba(30, 87, 153, 0) 57%);
                  box-shadow: rgba(255, 255, 255, 0.05) 0 -5px 0px 0px inset;
                  top: inherit;
                  bottom: -0.5em;
                  left: 0;
                  width: 100%;
                  height: 0.5em;
              }
            `
    : ''}
     ${({ state }) => {
    switch (state) {
      case 'start':
        return `
          &::before, &::after {
            background-image: -webkit-radial-gradient(center, ellipse cover, rgb(179 209 60 / 51%) 0%, rgba(30, 87, 153, 0.01) 53%, rgba(30, 87, 153, 0) 54%, rgba(30, 87, 153, 0) 57%);
          }
        `
      case 'end':
        return `
         &::before, &::after {
          transition:  opacity 1.2s ease-out;
	        background-image: -webkit-radial-gradient(center, ellipse cover, rgb(213 213 213 / 51%) 0%, rgba(30, 87, 153, 0.01) 53%, rgba(30, 87, 153, 0) 54%, rgba(30, 87, 153, 0) 57%);
         }
          `
      case 'wall':
        return `
         &::before, &::after {
           background-image: none;
         }
          `
      case 'path':
        return `
         &::before, &::after {
           background-image: -webkit-radial-gradient(center, ellipse cover, rgb(255 14 14 / 70%) 0%, rgba(30, 87, 153, 0.01) 53%, rgba(30, 87, 153, 0) 54%, rgba(30, 87, 153, 0) 57%);
         }
          `
      default:
        return '';
    }
  }}
`;
const Light = styled.div<{ state: string; }>`
    transition:  background-color 0.3s, box-shadow 1.2s ease-out;
    width: 0.4em;
    height: 0.4em;
    border-radius: 50%;
    background-color: #0c090947;
    box-shadow: #000000 0px 1px 0px 0px inset, rgb(229 220 220 / 14%) 0 -1px 0px 0px inset;
      ${({ state }) => {
    switch (state) {
      case 'start':
        return `
         background-color: #7bf708;
         box-shadow: rgb(255 255 255 / 40%) 0px 0px 5px 2px, rgb(18 247 29 / 14%) 0 0px 9px 11px;
        `
      case 'end':
        return `
       background-color: #ffdada;
       box-shadow: rgb(255 255 255 / 40%) 0px 0px 7px 2px, rgb(124 100 100 / 14%) 0 0px 6px 12px;
          `
      case 'visited':
        return `
           background-color: var(--blueish);
           box-shadow: rgb(255 255 255 / 40%) 0px 0px 6px 1px, rgb(76 190 255 / 14%) 0 0px 6px 1px;
          `
      case 'path':
        return `
         background-color: #ff0505;
         box-shadow: rgb(255 255 255 / 26%) 0px 0px 7px 1px, rgb(255 0 0 / 28%) 0 0px 7px 3px;
          `
      case 'weight':
        return `
          width: 15px;
          height: 15px;
          font-size: 0.3em;
          text-align: center;
          color: #80808045;
          line-height: 16px;
          background-color: #ffdada;
          text-shadow: #000 0 -1px 0;
          `
      default:
        return '';
    }
  }}
`;

const Node: React.FC<INodeComponent> = ({
  node, ...props
}) => {
  const dispatch = useDispatch();
  const animationSpeed = 10;
  const [classes, setClasses] = useState('');
  const [buttonClasses, setButtonClasses] = useState('');

  useEffect(() => {
    let timeout: number | null = null;

    if (node.isPath) {

      timeout = setTimeout(() => {
        setClasses('block_button_active block_button_active_path');
        // setButtonClasses('block_button_circle');
      }, animationSpeed * node.distance);
    } else if (node.isVisited) {
      // setting timeout for animation
      timeout = setTimeout(() => {
        setClasses('block_button_active');
        // check if animation ended and start animating path
        if (node.isFinish) {
          dispatch(setPath());
        }
      }, animationSpeed * node.whenVisited);
    } else {
      setClasses('');
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    node.isFinish,
    node.isVisited,
    node.isPath,
    node.isWall,
    node.isStart,
    node.distance,
    node.row,
    node.col,
    node.whenVisited,
    dispatch,
  ]);

  const variants = {
    initial: {
      width: '0.4em',
      height: '0.4em',
    },
    animate: {
      width: '15px',
      height: '15px',
      transition: {
        type: "spring", duration: 0.5,
      }
    }
  };

  return (
    <div className='block_wrapper'>
      <div
        id={`${node.row}-${node.col}`}
        aria-label={`${node.row}-${node.col}`}
        className={`block_button ${node.isStart || node.isFinish || node.isWall || node.weight > 0 ? "block_button_active" : ''} ${node.isWall ? 'block_button_active_wall' : ''} ${node.isStart ? 'block_button_active_start' : ''} ${node.isFinish ? 'block_button_active_end' : ''} ${classes}`}
        role='gridcell'
        tabIndex={0}
        {...props}
      >

        <span>
          <motion.div variants={variants} animate={node.weight > 0 ? "animate" : "initial"}
            initial="initial" className={`block_button_circle ${node.isStart ? "block_button_circle_start" : ''
              }
          ${node.isFinish ? "block_button_circle_end" : ''}
          ${node.isPath ? "block_button_circle_path" : ''} ${node.isWall ? "block_button_circle_wall" : ''} ${node.weight > 0 ? "block_button_circle_has_weight" : ''}
          ${node.isVisited ? "block_button_circle_visited" : ''}
          ${buttonClasses}
        `}>{node.weight > 0 ? node.weight : null}</motion.div>
        </span>
      </div>
    </div>
  );
};

export default Node;
