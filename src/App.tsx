import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './App.css';
import Mouse from './components/Mouse'
import Reset from './components/Reset'
import Run from './components/Run'
import Smile from './components/Smile';
import Dice from './components/Dice';
import {
  Algorithms,
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
  pressed_button: string;
}

const algos: Algorithms[] = ['dijkstra', 'astar', 'dfs', 'bfs'];
const clickActions: ClickAction[] = ['start', 'finish', 'wall', 'weight'];
const App = () => {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const dispatch = useDispatch();
  const [{ algo, action, locked, pressed_button }, setState] = useState<StateOptions>({
    algo: 'dijkstra',
    action: 'finish',
    locked: false,
    pressed_button: '',
  });

  const windowWidth = useWindowSize();
  useEffect(() => {
    let handle: any = null;
    if (pressed_button) {
      handle = setTimeout(() => {
        setState((prevState) => ({ ...prevState, pressed_button: '' }));
      }, 500);
      return () => { if (handle) clearTimeout(handle) }
    }
  }, [pressed_button]);
  useEffect(() => {
    dispatch(clearBoard());
    setState((prevState) => ({ ...prevState, locked: false }));
  }, [windowWidth, dispatch]);

  const handleCallAlgorithm = () => {
    if (locked) return;
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
    if (locked) return;
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
  const handleButtonClick = (button: string) => {
    setState((prevState) => ({ ...prevState, pressed_button: button }));
    switch (button) {
      case 'run':
        handleCallAlgorithm();
        break;
      case 'reset':
        handleClearBoard();
        break;
      case 'dice':

        break;
      case 'smile':

        break;
      default:
        break;
    }
  }
  return (
    <div className='bg-zinc-800 min-h-screen'>
      <menu>
        <div className='menu_wrapper'>
          <ul className="Nav Nav_Small MainNav" style={{ padding: "5px" }}>
            {algos.map((_algo, index) => (<button key={_algo + 'button'} className={`MainNav-Button ${_algo === algo ? 'MainNav-Button_LeftOfActive' : ''}`} onClick={() => handleSwitchAlgorithm(_algo, index)} ><span className={`
              menu_button_center ${_algo === algo ? 'menu_button_center_highlighter' : ''}
            `}></span></button>))}
          </ul>
          <ul className='menu_text_wrapper'>
            {algos.map((_algo) => (<li key={_algo + 'text'}><p className={`${_algo === algo ? 'highlighted_text' : ''}`}>{_algo}</p></li>))}
          </ul>
          <div><Mouse /></div>
        </div>
        <hr />
        <div className='menu_wrapper'>
          <ul className="Nav Nav_Small MainNav" style={{ padding: "5px" }}>
            {clickActions.map((_action) => (<button key={_action + 'button'} className={`MainNav-Button ${_action === action ? 'MainNav-Button_LeftOfActive' : ''}`}
              onClick={() => setState((prevState) => ({ ...prevState, action: _action }))}><span
                className={`menu_button_center ${_action === action ? 'menu_button_center_highlighter' : ''}`}
              ></span></button>))}
          </ul>
          <ul className='menu_text_wrapper'>
            {clickActions.map((_action) => (<li key={_action + 'text'}><p className={`${_action === action ? 'highlighted_text' : ''}`} >{_action}</p></li>))}
          </ul>
          <Mouse />
        </div>
        <hr />
        <ul className=" MainNav MainNav_action_buttons">
          <button className={`MainNav-Button ${pressed_button === 'run' ? "MainNav-Button_Active" : ""}
           ${pressed_button === 'reset' ? "MainNav-Button_LeftOfActive" : ''}`}
            onClick={() => handleButtonClick('run')}><Run /></button>
          <button className={`MainNav-Button 
          ${pressed_button === 'reset' ? "MainNav-Button_Active" : ""}
           ${pressed_button === 'run' ? "MainNav-Button_RightOfActive" : ''}
           ${pressed_button === 'dice' ? "MainNav-Button_LeftOfActive" : ''}
           `} onClick={() => handleButtonClick('reset')}><Reset /></button>
          <button className={`MainNav-Button 
          ${pressed_button === 'dice' ? "MainNav-Button_Active" : ""}
           ${pressed_button === 'reset' ? "MainNav-Button_RightOfActive" : ''}
           ${pressed_button === 'smile' ? "MainNav-Button_LeftOfActive" : ''}
           `} onClick={() => handleButtonClick('dice')}><Dice /></button>
          <button className={`MainNav-Button ${pressed_button === 'smile' ? "MainNav-Button_Active" : ""}
           ${pressed_button === 'dice' ? "MainNav-Button_RightOfActive" : ''}`} onClick={() => handleButtonClick('smile')}><Smile /></button>
        </ul>
      </menu >

      <div className='w-full'>
        <div className='flex flex-col items-center'>
          {nodes.map((row, index) => (
            <div className='flex' key={index}>
              {row.map((node, index) => (
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
