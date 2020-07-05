import React from 'react';
import ToolbarTag from '../../Toolbar/ToolbarTag/ToolbarTag';
import Aux from '../../../../hoc/Aux/Aux';
import './TableHeader.css';

const tableHeader = (props) => {
  const {pairAscending, priceAscending, changeAscending, volumeAscending} = props;
  const sortAscending = pairAscending || priceAscending || changeAscending || volumeAscending;
  const sortImage = sortAscending
  ? <img src="https://img.icons8.com/android/10/000000/sort-up.png" alt="^"/>
  : <img src="https://img.icons8.com/android/10/000000/sort-down.png" alt="∨"/>;
  const showType = props.showChange ? 'Change' : 'Volume';
  const clickType = props.showChange ? props.changeClick : props.volumeClick;
  const ascendingType = props.showChange ? changeAscending : volumeAscending;
  return <Aux >
    <thead className="tableHeader">
      <tr className="content">
        <td>
          <ToolbarTag click={props.pairClick}>Pair</ToolbarTag>
          {pairAscending !== null ? sortImage : null}
        </td>
        <td>
          <ToolbarTag click={props.priceClick}>Price</ToolbarTag>
          {priceAscending !== null ? sortImage : null}
        </td>
        <td>
          <ToolbarTag click={clickType}>{showType}</ToolbarTag>
          {ascendingType !== null ? sortImage : null}
        </td>
      </tr>
    </thead>
  </Aux>
}

export default tableHeader;