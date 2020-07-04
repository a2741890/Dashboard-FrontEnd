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
        pairAscending={props.pairAscending}
        priceAscending={props.priceAscending}
        changeAscending={props.changeAscending}/>
      <TableBody
        dataArr={props.dataArr}
        pairAscending={props.pairAscending}
        priceAscending={props.priceAscending}
        changeAscending={props.changeAscending}
        clickType={props.clickType}
        toolbarClicked={props.toolbarClicked}
        showChange={props.showChange}
        searchText={props.searchText} />
    </table>
  </div>
}

export default table;