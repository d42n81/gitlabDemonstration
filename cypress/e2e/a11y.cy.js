import '@axe-devtools/cypress'
describe('empty spec', () => {
  const resultsDir = './a11y-results/'
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it('add to cart', () => {
    cy.visit('http://abcdcomputech.dequecloud.com/laptopsandnotebooks.php')
    // analyze laptopsandnotebooks page
    cy.axeAnalyze({name: "laptopsandnotebooks"});
    cy.getAxeResults().then(async results => {
      results.name="laptopsAndNotebooks"
      await cy.writeFile(`${resultsDir}laptopsandnotebooks.json`, results)
    })
    // add laptop to cart
    cy.get("#content > table > tbody > tr:nth-child(2) > td > a:nth-child(2) > img").click();
    // analyze cart with laptop in it:
    cy.visit('http://abcdcomputech.dequecloud.com/cart.php')
    let date = new Date().toLocaleString()
    let filename = "cart"
    date = date.replace(/[^a-z0-9]/gi, '_');
    cy.axeAnalyze({name: filename+ '_' + date});
    cy.getAxeResults().then(async results => {
      results.name="cart"
      await cy.writeFile(`${resultsDir}`+filename+".json", results)
    })

    cy.readFile(`${resultsDir}cart.json`).then((data) =>{
      expect(data.findings.violations.length).to.equal(0);
    });
  })
})
