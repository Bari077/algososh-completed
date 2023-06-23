import { CircleCSS } from "../../src/types/testing";

describe('String page', () => {
  beforeEach(()=> {
    cy.visit(Cypress.config().baseUrl + '/recursion');
  });

  it('should disable button "Развернуть" if input empty', ()=> {
    cy.get('input').should('have.value', '');
    cy.get('button[type*=submit]').should('be.disabled');
  });

  it('should correctly reverse string', ()=> {
    cy.get('input').type('01234');
    cy.get('button[type*=submit]').click();

    cy.get('[data-cy*=circle]').as('circle');

    cy.get('@circle')
      .should('have.length',5)
      .each((el, index) => {
        cy.wrap(el)
          .should('contain', index)
          .and('have.css', 'border', CircleCSS.Default)
      });

    cy.get('@circle').each((el, index)=> {
      if(index === 0 || index === 4) {
        cy.wrap(el).should('have.css', 'border', CircleCSS.Changing)
      }      
    });

    cy.get('@circle').each((el, index)=> {
      if(index === 0 || index === 4) {
        cy.wrap(el).should('have.css', 'border', CircleCSS.Modified);
      }      
    });

    cy.get('@circle').each((el, index)=> {
      if(index === 0) {
        cy.wrap(el).should('contain', 4)
      }
      if(index === 4) {
        cy.wrap(el).should('contain', 0)
      }       
    });

    cy.get('@circle').each((el, index)=> {
      if(index === 1 || index === 3) {
        cy.wrap(el).should('have.css', 'border', CircleCSS.Changing)
      }      
    });

    cy.get('@circle').each((el, index)=> {
      if(index === 1 || index === 3) {
        cy.wrap(el).should('have.css', 'border', CircleCSS.Modified)
      }      
    });

    cy.get('@circle').each((el, index)=> {
      if(index === 1) {
        cy.wrap(el).should('contain', 3)
      }
      if(index === 3) {
        cy.wrap(el).should('contain', 1)
      }      
    });

    cy.get('@circle').each((el, index)=> {
      if(index === 2) {
        cy.wrap(el).should('have.css', 'border', CircleCSS.Changing)
      }      
    });

    cy.get('@circle').each((el, index)=> {
      if(index === 2) {
        cy.wrap(el).should('have.css', 'border', CircleCSS.Modified)
          .and('contain', 2)
      }      
    });    
  });
});