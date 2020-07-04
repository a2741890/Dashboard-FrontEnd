import React from 'react';
import ToolbarTag from './ToolbarTag/ToolbarTag';
import ToolbarSelection from './ToolbarTag/ToolbarSelection';
import ToolbarInput from './ToolbarTag/ToolbarInput';
import ToolbarButton from './ToolbarTag/ToolbarButton';


const toolbar = (props) => {
  const optionsALTS = ['ETH', 'TRX', 'XRP'];
  const optionsFIAT = ['USDT', 'BUSD', 'TUSD', 'USDC', 'PAX', 'BKRW', 'EUR', 'GBP', 'IDRT', 'NGN', 'RUB', 'TRY', 'ZAR', 'UAH'];

  return <div className="toolbar">
    <ToolbarTag>Margin</ToolbarTag>
    <ToolbarButton
      selected={props.selectedBNB}
      click={props.toolbarButtonClick}>BNB</ToolbarButton>
    <ToolbarButton
      selected={props.selectedBTC}
      click={props.toolbarButtonClick}>BTC</ToolbarButton>
    <ToolbarSelection
      options={optionsALTS}
      selectChange={props.selectChangeALTS}
      click={props.clickALTSHandler}
      selected={props.selectedALTS}>ALTS</ToolbarSelection>
    <ToolbarSelection
      options={optionsFIAT}
      selectChange={props.selectChangeFIAT}
      selected={props.selectedFIAT}>FIAT</ToolbarSelection>
    <ToolbarInput
      type="text"
      placeholder="Search..."
      width="70px"
      change={props.searchHandler} />
    <label style={{ width: "50px" }}>
      <ToolbarInput
        defaultChecked
        type="radio"
        name="show"
        value="Change"
        click={props.radioButtonClickHandler} />
    Change</label>
    <label style={{ width: "50px" }}>
      <ToolbarInput
        type="radio"
        name="show"
        value="Volume"
        click={props.radioButtonClickHandler} />
    Volume</label>
  </div >
}

export default toolbar;