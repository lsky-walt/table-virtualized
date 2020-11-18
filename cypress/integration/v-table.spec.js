const rowHeight = 40
const rowCount = 1000
const columnWidth = 100
const columnCount = 100

describe('VTable', () => {
  describe('Base', () => {
    beforeEach(() => {
      cy.visit('/#/base')
      cy.get('.vTable-container').as('container')
    })

    it('have container', () => {
      cy.get('@container').should('exist')
    })

    it('check attr', () => {
      cy.get('@container')
        .should('have.css', 'width', '860px')
        .should('have.css', 'height', '600px')
    })

    it('check row and column count', () => {
      cy.get('@container').get('.vTable-inner')
        .should('have.css', 'width', `${columnWidth * columnCount}px`)
        .should('have.css', 'height', `${rowHeight * rowCount}px`)
    })
  })
})
