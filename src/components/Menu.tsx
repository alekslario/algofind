import { TbMathFunction } from 'react-icons/tb';
import { RiToolsFill } from 'react-icons/ri';
import { VscRunAll } from 'react-icons/vsc';
import { AiOutlineClear } from 'react-icons/ai';
import { FaRegHourglass, FaEraser, FaWeightHanging } from 'react-icons/fa';
import { MdClearAll } from 'react-icons/md';
import { GiBrickWall } from 'react-icons/gi';
import { useState } from 'react';
import { parseInt } from 'lodash';
import { Algorithms, Tools } from '../utils/interfaces';
import ActionButton from './ActionButton';
import Mouse from './Mouse'
import Reset from './Reset'
import Run from './Run'

interface IConfigMenu {
  callAlgorithm: (algorithm: Algorithms) => void;
  clearBoard: () => void;
  clearPath: () => void;
  canRun: boolean;
  selectedTool: Tools;
  setSelectedTool: React.Dispatch<React.SetStateAction<Tools>>;
  weight: number;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
}

const ConfigMenu: React.FC<IConfigMenu> = ({
  callAlgorithm,
  clearBoard,
  clearPath,
  canRun,
  selectedTool,
  setSelectedTool,
  weight,
  setWeight,
}) => {
  const algorithms: Algorithms[] = ['dijkstra', 'astar', 'dfs', 'bfs'];
  const tools: Tools[] = ['Walls', 'Weight', 'Eraser'];

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<Algorithms>('dijkstra');

  return (
    <menu>
      <div className='menu_wrapper'>
        <ul className="Nav Nav_Small MainNav" style={{ padding: "5px" }}>
          <li className="MainNav-Button MainNav-Button_LeftOfActive"></li>
          <li className="MainNav-Button MainNav-Button_Active"></li>
          <li className="MainNav-Button MainNav-Button_RightOfActive"></li>
          <li className="MainNav-Button"></li>
        </ul>
        <ul className='menu_text_wrapper'>
          <li><p>Dijkstra</p></li>
          <li><p>Astar</p></li>
          <li><p>Dfs</p></li>
          <li><p>Bfs</p></li>
        </ul>
        <div><Mouse /></div>
      </div>
      <hr />
      <div className='menu_wrapper'>
        <ul className="Nav Nav_Small MainNav" style={{ padding: "5px" }}>
          <li className="MainNav-Button MainNav-Button_LeftOfActive"></li>
          <li className="MainNav-Button MainNav-Button_Active"></li>
          <li className="MainNav-Button MainNav-Button_RightOfActive"></li>
          <li className="MainNav-Button"></li>
        </ul>
        <ul className='menu_text_wrapper'>
          <li><p>Start</p></li>
          <li><p>Finish</p></li>
          <li><p>Wall</p></li>
          <li><p>Weight</p></li>
        </ul>
      </div>
      <hr />
      <ul className="MainNav_action_buttons">
        <li className="MainNav-Button MainNav-Button_LeftOfActive" ><Run /></li>
        <li className="MainNav-Button MainNav-Button_Active"><Reset /></li>

      </ul>
    </menu >

  );
};

export default ConfigMenu;
