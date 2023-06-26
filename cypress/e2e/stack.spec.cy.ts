import { CircleCSS } from "../../src/types/testing";
import { addButton, 
  deleteButton, 
  resetButton, 
  circleElement, 
  circleCard } from "../../src/constants/cypress";

const stackElements = [0,1,2,3,4,5]

describe('Stack page', () => {
  beforeEach(()=> {
    cy.visit('/stack');
  });

  it('should disable button "Добавить" if input empty', ()=> {
    cy.get('input').should('have.value', '');
    cy.get(addButton).should('be.disabled');
  });

  it('should correctly add element in stack', ()=> {

    stackElements.forEach((el, i) => {
      cy.get('input').type(`${el}`);
      cy.get(addButton).click();      
      
      cy.get(circleCard).as('circleList');      

      cy.get('@circleList').should('have.length', i+1)
      cy.get('@circleList').each((circle, index) => {        
        if(index === i) {
          cy.wrap(circle).find(circleElement)                      
            .should('have.css', 'border', CircleCSS.Changing)
            .and('contain', el);
          cy.wrap(circle).contains('top')
          cy.wrap(circle).find(circleElement).should('have.css', 'border', CircleCSS.Default) 
        } else {
          cy.wrap(circle).find(circleElement)            
            .should('have.css', 'border', CircleCSS.Default)
            .and('not.contain', 'top')
        }               
      });
    });    
  });

  it('should correctly delete elements from stack', ()=> {
    stackElements.forEach((el)=> {
      cy.get('input').type(`${el}`);
      cy.get(addButton).click();
    });

    cy.wait(500);

    for(let i = stackElements.length-1; i >= 0; i--) {
      cy.get(circleCard).as('circleList');      
      cy.get(deleteButton).click();
      cy.get('@circleList').eq(i)
        .find(circleElement)
        .should('have.css', 'border', CircleCSS.Changing);            
      cy.get('@circleList').should('have.length', i);
      if(i !== 0) {
        cy.get('@circleList').eq(i-1).contains('top')
      }
    };   
  });

  it('should reset stack by click "Очистить" button', ()=> {
    stackElements.forEach((el)=> {
      cy.get('input').type(`${el}`);
      cy.get(addButton).click();
    });

    cy.get(resetButton).click();
    cy.get(circleCard).should('have.length', 0);
    cy.get(deleteButton).should('be.disabled');
    cy.get(resetButton).should('be.disabled');
  });
})