
const routes = ["recursion", "fibonacci", "sorting", "stack", "queue", "list"];

describe('App works correctly with routes', () => {
  before(()=> {
    cy.visit(Cypress.config().baseUrl);
  });
  
  it('should open correct route', () => {
    routes.forEach(route => {
      cy.get(`a[href*=${route}]`).click();
      cy.get(`[data-cy=${route}]`).should('exist');
      cy.get('button').contains('К оглавлению').click();
      cy.url().should('eq', Cypress.config().baseUrl+'/')
    })    
  });
})