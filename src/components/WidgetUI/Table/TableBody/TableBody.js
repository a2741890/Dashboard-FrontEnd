import React from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import './TableBody.css';

const tableBody = (props) => {

  let sortedDataArr = [...props.dataArr];

  switch (props.clickType) {
    case 'pair':
      sortedDataArr = props.dataArr.sort((a, b) =>
        props.pairAscending ? a.b.localeCompare(b.b) : b.b.localeCompare(a.b));
      break;
    case 'price':
      sortedDataArr = props.dataArr.sort((a, b) =>
        props.priceAscending ? a.price - b.price : b.price - a.price);
      break;
    case 'change':
      sortedDataArr = props.dataArr.sort((a, b) =>
        props.changeAscending ? a.change - b.change : b.change - a.change);
      break;
    default:
      sortedDataArr = props.dataArr.sort((a, b) =>
        props.pairAscending ? a.b.localeCompare(b.b) : b.b.localeCompare(a.b));
  }

  if (props.toolbarClicked === 'ALTS') {
    sortedDataArr = sortedDataArr.filter(data => data.pm.toString() === 'ALTS');
  }
  else if (props.toolbarClicked === 'FIAT') {
  }
  else {
    sortedDataArr = sortedDataArr.filter(data => data.q.toString() === props.toolbarClicked.toString());
  }

  if (props.searchText !== '') {
    sortedDataArr = sortedDataArr.filter(data =>
      data.symbol.toLowerCase()
        .includes(props.searchText.toLowerCase()));
  }

  const content = sortedDataArr
    .map(data => {
      let changeType = "positive";
      if (data.change < 0) { changeType = "negative"; }
      const changeORvolume = props.showChange
        ? <td className={changeType}>{data.change.toFixed(2)}％</td>
        : <td className="volume">{data.v.toFixed(0)}</td>;
      return (
        <tr key={data.b+data.q} className="content">
          <td>{data.b + '/' + data.q}</td>
          <td>{data.price.toFixed(8).replace(/\.?0+$/, "")}</td>
          {changeORvolume}
        </tr>
      )
    });

  return <Aux>
    <tbody className="tableBody">
      {content}
    </tbody>
  </Aux>
}

export default tableBody;