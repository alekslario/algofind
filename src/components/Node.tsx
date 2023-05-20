/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { INode } from '../utils/interfaces';
import { setPath } from '../redux/nodesSlice';
import { Block, Light } from './Node.style';

interface INodeComponent {
  node: INode;
  onClick?: () => void;
}

const Node: React.FC<INodeComponent> = ({
  node, ...props
}) => {
  const dispatch = useDispatch();
  const animationSpeed = 30;
  const [animate, setBeginAnimate] = useState('');

  useEffect(() => {
    let timeout: number | null = null;

    if (node.isPath) {

      timeout = setTimeout(() => {
        setBeginAnimate('path')
      }, animationSpeed * (node.distance));
    } else if (node.isVisited) {
      // setting timeout for animation
      timeout = setTimeout(() => {
        setBeginAnimate('visited')
        if (node.isFinish) {
          dispatch(setPath());
        }
      }, animationSpeed * node.whenVisited);
    } else {
      setBeginAnimate('');
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

  return (
    <div className='block_wrapper'>
      <Block
        id={`${node.row}-${node.col}`}
        aria-label={`${node.row}-${node.col}`}
        node={node}
        animate={animate}
        role='gridcell'
        tabIndex={0}
        {...props}
      >
        <Light node={node}
          animate={animate}
        >{node.weight > 0 ? node.weight : null}</Light>
      </Block>
    </div>
  );
};

export default Node;
