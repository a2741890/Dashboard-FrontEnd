
describe('Test to visit website', () => {
  it('Visit the app', () => {
    cy.visit('/');
  })
})

describe('Check data loaded', () => {
  it('Data should be loaded to the widget', () => {
    cy.visit('/');
    cy.get('.tableBody').its('length').should('be.gt', 0);
  })
})

describe('Button Test', () => {
  it('BTC button should be selected and category BTC is shown when the page is loaded', () => {
    cy.visit('/');
    cy.get('.selected').contains('button', 'BTC');
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      cy.get($el).contains('BTC');
    })
  })
})

describe('Button Click Test', () => {
  it('Click "BNB" button and show category BNB', () => {
    cy.visit('/');
    cy.get('.toolbar > :nth-child(2)').click();
    cy.get('.selected').contains('button', 'BNB');
    cy.get('.selected').contains('button', 'BTC').should('not.exist');
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      cy.get($el).contains('BNB');
    })
  })
})

describe('Selection select Test', () => {
  it('Select "ALTS" selection and categories ETH, TRX and XRP are shown, and select ETH, TRX or XRP will show the respective category', () => {
    cy.visit('/');
    cy.get(':nth-child(4) > select').select('ALTS');
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      cy.get($el).contains(/ETH|TRX|XRP/g);
    })
    cy.get(':nth-child(4) > select').select('ETH');
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      cy.get($el).contains('ETH');
    })
    cy.get(':nth-child(4) > select').select('TRX');
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      cy.get($el).contains('TRX');
    })
    cy.get(':nth-child(4) > select').select('XRP');
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      cy.get($el).contains('XRP');
    })
  })
})

describe('Selection select Test', () => {
  it('Use "FIAT" selection and choose different options and table will show the respective category', () => {
    cy.visit('/');
    cy.get(':nth-child(5) > select > option').each(($ele, $index) => {
      cy.get(':nth-child(5) > select').select($ele.text());
      cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
        if ($ele.text() !== 'FIAT') {
          cy.get($el).contains($ele.text());
        }
      })
    })

  })
})

describe('Searchbar Test', () => {
  it('Type in text in searchbar and the respective result shoulb be shown', () => {
    cy.visit('/');
    cy.get(':nth-child(6) > input').type('GAS');
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      cy.get($el).contains('GAS');
    });
    cy.get(':nth-child(6) > input').clear();
    cy.get(':nth-child(6) > input').type('MANA');
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      cy.get($el).contains('MANA');
    });
    cy.get(':nth-child(6) > input').clear();
    cy.get(':nth-child(6) > input').type('Nothing return');
    cy.get('.tableBody').find('tr').should('not.exist');
  })
})

describe('Radio button Test', () => {
  it('Radio button "Change" should be pre-checked and show change of the data when the page is loaded', () => {
    cy.visit('/');
    cy.get(':nth-child(7) > .toolbarInput > input').should('have.attr', 'checked');
    cy.get(':nth-child(7) > .toolbarInput > input').should('be.checked');
    cy.get('.tableHeader > .content > :nth-child(3)').contains('div', 'Change');
  })
})

describe('Radio button Test', () => {
  it('Check radio button "Volume" and show volume of the data', () => {
    cy.visit('/');
    cy.get(':nth-child(8) > .toolbarInput > input').click();
    cy.get(':nth-child(8) > .toolbarInput > input').should('be.checked');
    cy.get('.tableHeader > .content > :nth-child(3)').contains('div', 'Volume');
  })
})

describe('Table Tag Test', () => {
  it('Click table tags "Pari", "Price", "Change" and "Volume" should sort data in the table.', () => {
    cy.visit('/');
    let testPairArr = [];
    let testPriceArr = [];
    let testChangeArr = [];

    let sortedPairArray = [];
    cy.get('.tableBody > tr').find(':nth-child(1)').each(($el, $index) => {
      testPairArr.push($el.text());
      sortedPairArray.push($el.text());
    })
    cy.wrap(sortedPairArray).should('deep.eq', testPairArr.sort((a,b) => a - b));
    cy.get(':nth-child(1) > .toolbarTag').click({multiple: true});
    cy.wrap(sortedPairArray).should('deep.eq', testPairArr.sort((a,b) => b - a));

    cy.get('.content > :nth-child(2) > .toolbarTag').click({multiple: true});
    let sortedPriceArray = [];
    cy.get('.tableBody > tr').find(':nth-child(2)').each(($el, $index) => {
      testPriceArr.push($el.text());
      sortedPriceArray.push($el.text());
    })
    cy.wrap(sortedPriceArray).should('deep.eq', testPriceArr.sort((a,b) => a - b));
    cy.get('.content > :nth-child(2) > .toolbarTag').click({multiple: true});
    cy.wrap(sortedPriceArray).should('deep.eq', testPriceArr.sort((a,b) => b - a));

    cy.get(':nth-child(3) > .toolbarTag').click({multiple: true});
    let sortedChangeArray = [];
    cy.get('.tableBody > tr').find(':nth-child(3)').each(($el, $index) => {
      testChangeArr.push($el.text());
      sortedChangeArray.push($el.text());})
    cy.wrap(sortedChangeArray).should('deep.eq', testChangeArr.sort((a,b) => a - b));
    cy.get(':nth-child(3) > .toolbarTag').click({multiple: true});
    cy.wrap(sortedChangeArray).should('deep.eq', testChangeArr.sort((a,b) => b - a));

    cy.get(':nth-child(8) > .toolbarInput > input').click({multiple: true});
    let testVolumeArr = [];
    cy.get(':nth-child(3) > .toolbarTag').click({multiple: true});
    let sortedVolumeArray = [];
    cy.get('.tableBody > tr').find(':nth-child(3)').each(($el, $index) => {
      testVolumeArr.push($el.text());
      sortedVolumeArray.push($el.text());})
    cy.wrap(sortedVolumeArray).should('deep.eq', testVolumeArr.sort((a,b) => a - b));
    cy.get(':nth-child(3) > .toolbarTag').click({multiple: true});
    cy.wrap(sortedVolumeArray).should('deep.eq', testVolumeArr.sort((a,b) => b - a));

  })
})



