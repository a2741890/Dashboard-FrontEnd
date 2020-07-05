import React from 'react';
import Header from '../Header/Header';
import Toolbar from '../Toolbar/Toolbar';
import Table from '../Table/Table';
import './WidgetUI.css';


const widgetUI = (props) => {

  return <div className="widgetUI">
    <Header />
    <Toolbar
      selectChangeALTS={props.selectChangeALTS}
      clickALTSHandler={props.clickALTSHandler}
      selectChangeFIAT={props.selectChangeFIAT}
      selectedBNB={props.selectedBNB}
      selectedBTC={props.selectedBTC}
      selectedALTS={props.selectedALTS}
      selectedFIAT={props.selectedFIAT}
      toolbarButtonClick={props.toolbarButtonClick}
      radioButtonClickHandler={props.radioButtonClickHandler}
      searchHandler={props.searchHandler} />
    <Table
      dataArr={props.dataArr}
      pairAscending={props.pairAscending}
      priceAscending={props.priceAscending}
      changeAscending={props.changeAscending}
      volumeAscending={props.volumeAscending}
      pairClick={props.pairClick}
      priceClick={props.priceClick}
      changeClick={props.changeClick}
      volumeClick={props.volumeClick}
      clickType={props.clickType}
      toolbarClicked={props.toolbarClicked}
      showChange={props.showChange}
      searchText={props.searchText} />
  </div>
}

export default widgetUI;