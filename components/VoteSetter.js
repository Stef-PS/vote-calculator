class VoteSetter extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style></style>
      <div>
        <button id="plus">+</button>
        <button id="minus">-</button>
      </div>
  }
}
