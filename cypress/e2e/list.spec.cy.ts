import { CircleCSS } from "../../src/types/testing";



describe('ListPage', () => {
  beforeEach(()=> {
    cy.visit(Cypress.config().baseUrl + '/list');
  });

  it('should disable buttons "Добавить в head", "Добавить в tail" if valueInput empty', ()=> {
    cy.get('input[data-cy*=valueInput]').should('have.value', '');
    cy.get('button[data-cy*=addInHead]').should('be.disabled');
    cy.get('button[data-cy*=addInTail]').should('be.disabled');
  });

  it('should disable buttons "Добавить по индексу", "Удалить по индексу" if indexInput empty', ()=> {
    cy.get('input[data-cy*=indexInput]').should('have.value', '');
    cy.get('button[data-cy*=addByIndex]').should('be.disabled');
    cy.get('button[data-cy*=deleteByIndex]').should('be.disabled');
  });

  it('should correctly render default list', ()=> {
    cy.get('[data-cy*=c-card]').as('circleList');
    cy.get('@circleList').each((card, index)=> {
      cy.wrap(card).find('p[class*=type_circle]').should('not.be.empty');
      cy.wrap(card).find('[data-cy*=circle]').should('have.css', 'border', CircleCSS.Default);
      if(index === 0) {
        cy.wrap(card).find('[data-cy*=c-head]').should('contain', 'head')
      }
    });
    cy.get('@circleList').last().find('[data-cy*=c-tail]').should('contain', 'tail');    
  });

  it('should correctly add element in head', ()=> {
    cy.get('[data-cy*=c-card]').as('circleList');
    cy.get('@circleList').then((list)=> {
      const length = list.length;    
      cy.get('input[data-cy*=valueInput]').type('0');
      cy.get('button[data-cy*=addInHead]').click();
      cy.get('@circleList').eq(0)
        .find('[data-cy*=c-head]')
        .find('[data-cy*=circle]')
        .should('have.css', 'border', CircleCSS.Changing)
        .and('contain', '0');
      cy.wait(500);
      cy.get('[data-cy*=circle]').eq(0)
        .should('have.css', 'border', CircleCSS.Modified)
        .and('contain', '0');
      cy.get('[data-cy*=c-head]').eq(0).should('contain', 'head');
      cy.get('[data-cy*=circle]').eq(0).should('have.css', 'border', CircleCSS.Default);
      cy.get('@circleList').should('have.length', `${length+1}`);
    });
  });

  it('should correctly add element in tail', ()=> {
    cy.get('[data-cy*=c-card]').as('circleList');
    cy.get('@circleList').then((list)=> {
      const length = list.length;    
      cy.get('input[data-cy*=valueInput]').type('9999');
      cy.get('button[data-cy*=addInTail]').click();
      cy.wrap(list).last()
        .find('[data-cy*=c-head]')
        .find('[data-cy*=circle]')
        .should('have.css', 'border', CircleCSS.Changing)
        .and('contain', '9999');      
      cy.get('[data-cy*=circle]').last()
        .should('have.css', 'border', CircleCSS.Modified)
        .and('contain', '9999');
      cy.get('[data-cy*=c-tail]').last().should('contain', 'tail');
      cy.get('[data-cy*=circle]').last().should('have.css', 'border', CircleCSS.Default);
      cy.get('@circleList').should('have.length', `${length+1}`);
    });
  });

  it('should correctly add element by index', ()=> {
    cy.get('[data-cy*=c-card]').as('circleList');
    cy.get('@circleList').then((list)=> {
      const length = list.length;    
      cy.get('input[data-cy*=valueInput]').type(`${length-1}`);
      length === 1 ? 
      cy.get('input[data-cy*=indexInput]').type('0') :
      cy.get('input[data-cy*=indexInput]').type(`${length-1}`);
      cy.get('button[data-cy*=addByIndex]').click();      
       
      for(let i = 0; i < length; i++) {
        cy.get('[data-cy*=c-head]').eq(i)
        .find('[data-cy*=circle]')
        .should('have.css', 'border', CircleCSS.Changing)
        .and('contain', `${length-1}`);         
        cy.wait(500);
        if(i < length -1) {
          cy.get('[data-cy*=circle]').eq(i)
            .should('have.css', 'border', CircleCSS.Changing);
        } else {
          cy.get('[data-cy*=circle]').eq(i)
            .should('have.css', 'border', CircleCSS.Modified)
            .and('contain', `${length-1}`);
        }       
      }
      
      cy.get('@circleList').each((circle)=> {
        cy.wrap(circle)
        .find('[data-cy*=circle]')
        .should('have.css', 'border', CircleCSS.Default)
      });
      cy.get('@circleList').should('have.length', `${length+1}`);      
    });
  });

  it('should correctly delete element by index', ()=> {
    cy.get('[data-cy*=c-card]').as('circleList');
    cy.get('@circleList').then((list)=> {
      const length = list.length;
      cy.get('input[data-cy*=indexInput]').type(`${length-1}`);
      cy.get('button[data-cy*=deleteByIndex]').click();      
       
      for(let i = 0; i < length; i++) {
        cy.get('@circleList').eq(i)
        .find('[data-cy*=circle]')
        .should('have.css', 'border', CircleCSS.Changing)
        if(i === length - 1 ) {
          cy.get('@circleList').eq(i)
            .find('[data-cy*=circle]')
            .find('p')
            .then(function (p) {                         
            const val = p.text();
            cy.wrap(list).eq(i)
              .find('[data-cy*=c-tail]')
              .find('[data-cy*=circle]')
              .should('have.css', 'border', CircleCSS.Changing)
              .and('contain', val)
            }
          )
          cy.get(('[data-cy*=circle]')).eq(i).should('contain', '');                     
        }         
        cy.wait(500);                
      }
        
      cy.get('@circleList').should('have.length', `${length-1}`);
      cy.get('@circleList').each((circle)=> {
        cy.wrap(circle)
        .find('[data-cy*=circle]')
        .should('have.css', 'border', CircleCSS.Default)
      });            
    })
  });
});