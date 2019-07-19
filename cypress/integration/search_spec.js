describe('Successful single result query', function () {
	it('Makes a search query and gets expects one result', function () {
		cy.visit('https://www.broadway.com/shows/tickets/')
		cy.contains('Search').click()
		cy.get('input').filter('#nav-typeahead-js').type('Frozen')
		cy.get('ul').filter('#downshift-0-menu').within(() => {
		  cy.get('a').its('length').should('eq', 1)
		})
	})
})

describe('Successful multi result query', function () {
	it('Makes a search query and expects multiple results', function () {
		cy.visit('https://www.broadway.com/shows/tickets/')
		cy.contains('Search').click()
		cy.get('input').filter('#nav-typeahead-js').type('The')
		cy.get('ul').filter('#downshift-0-menu').within(() => {
		  cy.get('a').its('length').should('be.gt', 1)
		})
	})
})

describe('Unsuccessful query', function () {
	it('Makes a search query and expects no results', function () {
		cy.visit('https://www.broadway.com/shows/tickets/')
		cy.contains('Search').click()
		cy.get('input').filter('#nav-typeahead-js').type('abc123!@#{enter}')
		cy.get('h2.mbn').eq(1).should('have.text', "Sorry, we couldn't find anything.")
	})
})