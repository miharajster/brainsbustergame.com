describe('BrainBuster2000', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the start button', () => {
    cy.get('#start').should('be.visible');
  });

  it('should start the game and display the numbers', () => {
    cy.get('#start').click();
    cy.get('div.number').should('have.length', 2);
  });

  it('should display correct or wrong message on user input', () => {
    cy.get('#start').click();
    cy.get('input.user-input').type('5');
    cy.get('#test').click();
    cy.get('#log').should('be.visible');
  });

  it('should reset the input and start a new chain on reroll', () => {
    cy.get('#start').click();
    cy.get('input.user-input').type('5');
    cy.get('#reroll').click();
    cy.get('input.user-input').should('have.value', '');
    cy.get('div.number').should('have.length', 2);
  });
});
