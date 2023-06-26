import { CircleCSS } from "../../src/types/testing";
import { addButton, 
  deleteButton, 
  resetButton, 
  circleElement, 
  headElement, 
  tailElement } from "../../src/constants/cypress";

const queueElements = [1,2,3]

describe('QueuePage', () => {
  beforeEach(()=> {
    cy.visit('/queue');
  });

  it('should disable button "Добавить" if input empty', ()=> {
    cy.get('input').should('have.value', '');
    cy.get(addButton).should('be.disabled');
  });

  it('should correctly add element in queue', ()=> {
    cy.get(circleElement).as('circle');
    cy.get(headElement).as('head');
    cy.get(tailElement).as('tail');

    cy.get('input').type('1');
    cy.get(addButton).click();
    cy.get('@circle').eq(0)
      .should('have.css', 'border', CircleCSS.Changing)
      .and('contain', 1)
    cy.get('@head').eq(0).should('contain','head');
    cy.get('@tail').eq(0).should('contain','tail');
    cy.get('@circle').eq(0).should('have.css', 'border', CircleCSS.Default);

    cy.get('input').type('2');
    cy.get(addButton).click();
    cy.get('@circle').eq(1)
      .should('have.css', 'border', CircleCSS.Changing)
      .and('contain', 2)
    cy.get('@head').eq(0).should('contain','head');
    cy.get('@tail').eq(1).should('contain','tail');
    cy.get('@circle').eq(1).should('have.css', 'border', CircleCSS.Default);
  });

  it('should correctly delete element from queue', ()=> {
    queueElements.forEach(el => {
      cy.get('input').type(`${el}`);
      cy.get(addButton).click();
    });

    cy.wait(500);

    cy.get(circleElement).as('circle');
    cy.get(headElement).as('head');
    cy.get(tailElement).as('tail');

    cy.get(deleteButton).click();
    cy.get('@circle').eq(0).should('have.css', 'border', CircleCSS.Changing);
    cy.get('@tail').eq(2).should('contain','tail');
    cy.get('@head').eq(1).should('contain','head');
    cy.get('@circle').eq(0)
      .should('have.css', 'border', CircleCSS.Default)
      .and('contain', '');

    cy.get(deleteButton).click();
    cy.get('@circle').eq(1).should('have.css', 'border', CircleCSS.Changing);
    cy.get('@tail').eq(2).should('contain','tail');
    cy.get('@head').eq(2).should('contain','head');
    cy.get('@circle').eq(1)
      .should('have.css', 'border', CircleCSS.Default)
      .and('contain', '');
    
    cy.get(deleteButton).click();
    cy.get('@circle').eq(2).should('have.css', 'border', CircleCSS.Changing);
    
    cy.get('@circle').eq(2)
      .should('have.css', 'border', CircleCSS.Default)
      .and('contain', '');
    cy.get('@tail').each((el)=> {
      cy.wrap(el).should('contain','')
    });
    cy.get('@tail').each((el)=> {
      cy.wrap(el).should('contain','')
    }); 
  });

  it('should reset queue by click "Очистить" button', ()=> {
    queueElements.forEach(el => {
      cy.get('input').type(`${el}`);
      cy.get(addButton).click();
    });

    cy.wait(500);

    cy.get(resetButton).click();
    cy.get(circleElement).each(circle => {
      cy.wrap(circle).find('p').should('contain','')
    });

    cy.get('input').type('1');
    cy.get(addButton).click();
    cy.get(headElement).eq(0).should('contain','head');
    cy.get(tailElement).eq(0).should('contain','tail');
  });
})