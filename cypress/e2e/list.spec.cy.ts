import { CircleCSS } from "../../src/types/testing";
import { addInHeadButton, 
  addInTailButton,
  addByIndexButton,
  deleteByIndexButton,
  valueInput,
  indexInput, 
  circleElement,
  headElement,
  tailElement, 
  circleCard } from "../../src/constants/cypress";


describe('ListPage', () => {
  beforeEach(()=> {
    cy.visit('/list');
  });

  it('should disable buttons "Добавить в head", "Добавить в tail" if valueInput empty', ()=> {
    cy.get(valueInput).should('have.value', '');
    cy.get(addInHeadButton).should('be.disabled');
    cy.get(addInTailButton).should('be.disabled');
  });

  it('should disable buttons "Добавить по индексу", "Удалить по индексу" if indexInput empty', ()=> {
    cy.get(indexInput).should('have.value', '');
    cy.get(addByIndexButton).should('be.disabled');
    cy.get(deleteByIndexButton).should('be.disabled');
  });

  it('should correctly render default list', ()=> {
    cy.get(circleCard).as('circleList');
    cy.get('@circleList').each((card, index)=> {
      cy.wrap(card).find('p[class*=type_circle]').should('not.be.empty');
      cy.wrap(card).find(circleElement).should('have.css', 'border', CircleCSS.Default);
      if(index === 0) {
        cy.wrap(card).find(headElement).should('contain', 'head')
      }
    });
    cy.get('@circleList').last().find(tailElement).should('contain', 'tail');    
  });

  it('should correctly add element in head', ()=> {
    cy.get(circleCard).as('circleList');
    cy.get('@circleList').then((list)=> {
      const length = list.length;    
      cy.get(valueInput).type('0');
      cy.get(addInHeadButton).click();
      cy.get('@circleList').eq(0)
        .find(headElement)
        .find(circleElement)
        .should('have.css', 'border', CircleCSS.Changing)
        .and('contain', '0');
      cy.wait(500);
      cy.get(circleElement).eq(0)
        .should('have.css', 'border', CircleCSS.Modified)
        .and('contain', '0');
      cy.get(headElement).eq(0).should('contain', 'head');
      cy.get(circleElement).eq(0).should('have.css', 'border', CircleCSS.Default);
      cy.get('@circleList').should('have.length', `${length+1}`);
    });
  });

  it('should correctly add element in tail', ()=> {
    cy.get(circleCard).as('circleList');
    cy.get('@circleList').then((list)=> {
      const length = list.length;    
      cy.get(valueInput).type('9999');
      cy.get(addInTailButton).click();
      cy.wrap(list).last()
        .find(headElement)
        .find(circleElement)
        .should('have.css', 'border', CircleCSS.Changing)
        .and('contain', '9999');      
      cy.get(circleElement).last()
        .should('have.css', 'border', CircleCSS.Modified)
        .and('contain', '9999');
      cy.get(tailElement).last().should('contain', 'tail');
      cy.get(circleElement).last().should('have.css', 'border', CircleCSS.Default);
      cy.get('@circleList').should('have.length', `${length+1}`);
    });
  });

  it('should correctly add element by index', ()=> {
    cy.get(circleCard).as('circleList');
    cy.get('@circleList').then((list)=> {
      const length = list.length;    
      cy.get(valueInput).type(`${length-1}`);
      length === 1 ? 
      cy.get(indexInput).type('0') :
      cy.get(indexInput).type(`${length-1}`);
      cy.get(addByIndexButton).click();      
       
      for(let i = 0; i < length; i++) {
        cy.get(headElement).eq(i)
        .find(circleElement)
        .should('have.css', 'border', CircleCSS.Changing)
        .and('contain', `${length-1}`);         
        cy.wait(500);
        if(i < length -1) {
          cy.get(circleElement).eq(i)
            .should('have.css', 'border', CircleCSS.Changing);
        } else {
          cy.get(circleElement).eq(i)
            .should('have.css', 'border', CircleCSS.Modified)
            .and('contain', `${length-1}`);
        }       
      }
      
      cy.get('@circleList').each((circle)=> {
        cy.wrap(circle)
        .find(circleElement)
        .should('have.css', 'border', CircleCSS.Default)
      });
      cy.get('@circleList').should('have.length', `${length+1}`);      
    });
  });

  it('should correctly delete element by index', ()=> {
    cy.get(circleCard).as('circleList');
    cy.get('@circleList').then((list)=> {
      const length = list.length;
      cy.get(indexInput).type(`${length-1}`);
      cy.get(deleteByIndexButton).click();      
       
      for(let i = 0; i < length; i++) {
        cy.get('@circleList').eq(i)
        .find(circleElement)
        .should('have.css', 'border', CircleCSS.Changing)
        if(i === length - 1 ) {
          cy.get('@circleList').eq(i)
            .find(circleElement)
            .find('p')
            .then(function (p) {                         
            const val = p.text();
            cy.wrap(list).eq(i)
              .find(tailElement)
              .find(circleElement)
              .should('have.css', 'border', CircleCSS.Changing)
              .and('contain', val)
            }
          )
          cy.get(circleElement).eq(i).should('contain', '');                     
        }         
        cy.wait(500);                
      }
      if(length !== 1) {
        cy.get('@circleList').should('have.length', `${length-1}`);
        cy.get('@circleList').each((circle)=> {
          cy.wrap(circle)
          .find(circleElement)
          .should('have.css', 'border', CircleCSS.Default)
        });     
      }             
    })
  });
});