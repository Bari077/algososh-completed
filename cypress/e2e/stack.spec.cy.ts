import { CircleCSS } from "../../src/types/testing";

const stackElements = [0,1,2,3,4,5]

describe('Stack page', () => {
  beforeEach(()=> {
    cy.visit(Cypress.config().baseUrl + '/stack');
  });

  it('should disable button "Добавить" if input empty', ()=> {
    cy.get('input').should('have.value', '');
    cy.get('button[data-cy*=addButton]').should('be.disabled');
  });

  it('should correctly add element in stack', ()=> {

    stackElements.forEach((el, i) => {
      cy.get('input').type(`${el}`);
      cy.get('button[data-cy*=addButton]').click();      
      
      cy.get('[data-cy*=c-card]').as('circle');      

      cy.get('@circle').should('have.length', i+1)
      cy.get('@circle').each((circle, index) => {        
        if(index === i) {
          cy.wrap(circle).find('[data-cy*=circle]')                      
            .should('have.css', 'border', CircleCSS.Changing)
            .and('contain', el);
          cy.wrap(circle).contains('top')
          cy.wrap(circle).find('[data-cy*=circle]').should('have.css', 'border', CircleCSS.Default) 
        } else {
          cy.wrap(circle).find('[data-cy*=circle]')            
            .should('have.css', 'border', CircleCSS.Default)
            .and('not.contain', 'top')
        }               
      });
    });    
  });

  it('should correctly delete elements from stack', ()=> {
    stackElements.forEach((el)=> {
      cy.get('input').type(`${el}`);
      cy.get('button[data-cy*=addButton]').click();
    });

    cy.wait(500);

    for(let i = stackElements.length-1; i >= 0; i--) {
      cy.get('[data-cy*=c-card]').as('circle');      
      cy.get('button[data-cy*=deleteButton]').click();
      cy.get('@circle').eq(i)
        .find('[data-cy*=circle]')
        .should('have.css', 'border', CircleCSS.Changing);            
      cy.get('@circle').should('have.length', i);
      if(i !== 0) {
        cy.get('@circle').eq(i-1).contains('top')
      }
    };   
  });

  it('should reset stack by click "Очистить" button', ()=> {
    stackElements.forEach((el)=> {
      cy.get('input').type(`${el}`);
      cy.get('button[data-cy*=addButton]').click();
    });

    cy.get('button[type*=reset]').click();
    cy.get('[data-cy*=c-card]').should('have.length', 0);
    cy.get('button[data-cy*=deleteButton]').should('be.disabled');
    cy.get('button[type*=reset]').should('be.disabled');
  });
})