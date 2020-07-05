import React from 'react';
import './Table.css';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';

const table = (props) => {
  return <div className="table">
    <table>
      <TableHeader
        pairClick={props.pairClick}
        priceClick={props.priceClick}
        changeClick={props.changeClick}
        volumeClick={props.volumeClick}
        pairAscending={props.pairAscending}
        priceAscending={props.priceAscending}
        changeAscending={props.changeAscending}
        volumeAscending={props.volumeAscending}
        showChange={props.showChange}/>
      <TableBody
        dataArr={props.dataArr}
        pairAscending={props.pairAscending}
        priceAscending={props.priceAscending}
        changeAscending={props.changeAscending}
        volumeAscending={props.volumeAscending}
        clickType={props.clickType}
        toolbarClicked={props.toolbarClicked}
        showChange={props.showChange}
        searchText={props.searchText} />
    </table>
  </div>
}

export default table;