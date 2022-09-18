class CrossIcon extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: var(--spacing-medium);
        }
        svg {
          width: var(--spacing-large);
          height: var(--spacing-large);
          stroke: red;
        }
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    `
  }
}

customElements.define('cross-icon', CrossIcon)
