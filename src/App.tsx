import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './App.css';
import Mouse from './components/Mouse'
import Reset from './components/Reset'
import Run from './components/Run'
import Menu from './components/Menu';

import {
  Algorithms,
  INode,
  Tools,
} from './utils/interfaces';
import Node from './components/Node';
import { RootState } from './redux/store';
import {
  changeFinish,
  changeStart,
  clearBoard,
  clearPath,
  resetNode,
  runAlgorithm,
  setWeight,
  toggleWall,
} from './redux/nodesSlice';
import useWindowSize from './hooks/useWindowSize';
type ClickAction = 'start' | 'finish' | 'wall' | 'weight';
type StateOptions = {
  algo: Algorithms;
  action: ClickAction;
  locked: boolean;
}

const algos: Algorithms[] = ['dijkstra', 'astar', 'dfs', 'bfs'];
const clickActions: ClickAction[] = ['start', 'finish', 'wall', 'weight'];
const App = () => {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const dispatch = useDispatch();
  const [{ algo, action }, setState] = useState<StateOptions>({
    algo: 'dijkstra',
    action: 'finish',
    locked: false,
  });

  const windowWidth = useWindowSize();

  useEffect(() => {
    dispatch(clearBoard());
  }, [windowWidth, dispatch]);

  const handleCallAlgorithm = () => {
    setState((prevState) => ({ ...prevState, locked: true }));
    dispatch(runAlgorithm(algo));
  };

  const handleClearBoard = () => {
    dispatch(clearBoard());
    setState((prevState) => ({ ...prevState, locked: false }));
  };

  const handleClearPath = () => {
    dispatch(clearPath());
    setState((prevState) => ({ ...prevState, locked: false }));
  };

  const handleSwitchAlgorithm = (algo: Algorithms, index: number) => {
    setState((prevState) => ({ ...prevState, algo }));
  }

  const handleNodeClick = (col: number, row: number) => {

    switch (action) {
      case 'start':
        dispatch(changeStart({ col, row }));
        break;
      case 'finish':
        dispatch(changeFinish({ col, row }));
        break;
      case 'wall':
        dispatch(toggleWall({ col, row }));
        break;
      case 'weight':
        dispatch(setWeight({ col, row }));
        break;
      default:
        break;
    }
  };

  return (
    <div className='bg-zinc-800 min-h-screen'>
      <menu>
        <div className='menu_wrapper'>
          <ul className="Nav Nav_Small MainNav" style={{ padding: "5px" }}>
            {algos.map((_algo, index) => (<button className={`MainNav-Button ${_algo === algo ? 'MainNav-Button_LeftOfActive' : ''}`} onClick={() => handleSwitchAlgorithm(_algo, index)} ></button>))}
          </ul>
          <ul className='menu_text_wrapper'>
            {algos.map((_algo) => (<li><p>{_algo}</p></li>))}
          </ul>
          <div><Mouse /></div>
        </div>
        <hr />
        <div className='menu_wrapper'>
          <ul className="Nav Nav_Small MainNav" style={{ padding: "5px" }}>
            {clickActions.map((_action) => (<button className={`MainNav-Button ${_action === action ? 'MainNav-Button_LeftOfActive' : ''}`}
              onClick={() => setState((prevState) => ({ ...prevState, action: _action }))}></button>))}
          </ul>
          <ul className='menu_text_wrapper'>
            {clickActions.map((_action) => (<li><p>{_action}</p></li>))}
          </ul>
        </div>
        <hr />
        <ul className="MainNav_action_buttons">
          <button className="MainNav-Button MainNav-Button_LeftOfActive" onClick={handleCallAlgorithm}><Run /></button>
          <button className="MainNav-Button MainNav-Button_Active" onClick={handleClearBoard}><Reset /></button>
        </ul>
      </menu >

      <div className='w-full'>
        <div className='flex flex-col items-center'>
          {nodes.map((row) => (
            <div className='flex'>
              {row.map((node) => (
                <Node
                  node={node}
                  key={node.col + node.row}
                  onClick={() => handleNodeClick(node.col, node.row)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
