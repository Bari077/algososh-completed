import { submitButton, circleElement } from '../../src/constants/cypress';

describe('Fibonacci page', () => {
  beforeEach(()=> {
    cy.visit('/fibonacci');
  });

  it('should disable button "Рассчитать" if input empty', ()=> {
    cy.get('input').should('have.value', '');
    cy.get(submitButton).should('be.disabled');
  });

  it('should correctly generate numbers', ()=> {
    cy.get('input').type('6');
    cy.get(submitButton).click();

    cy.get(circleElement).as('circle');


    cy.get('@circle').should('have.length', 1);
    cy.get('@circle').eq(0).contains(1);

    cy.get('@circle').should('have.length', 2);
    cy.get('@circle').eq(1).contains(1);

    cy.get('@circle').should('have.length', 3);
    cy.get('@circle').eq(2).contains(2);

    cy.get('@circle').should('have.length', 4);
    cy.get('@circle').eq(3).contains(3);

    cy.get('@circle').should('have.length', 5);
    cy.get('@circle').eq(4).contains(5);

    cy.get('@circle').should('have.length', 6);
    cy.get('@circle').eq(5).contains(8);

    cy.get('@circle').should('have.length', 7);
    cy.get('@circle').eq(6).contains(13);
  })

})