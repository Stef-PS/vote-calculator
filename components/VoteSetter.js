class VoteSetter extends HTMLElement {
  #visible = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 100%;
        }
        div {
          width: 100%;
          display: flex;
          flex-direction: row;
          height: 0;
          transition: height 0.3s ease-in-out;
          border-top: 1px solid var(--color-grey);
        }
        button {
          width: 100%;
          height: var(--spacing-xxxlarge);
          font-size: 200%;
          margin: var(--spacing-small);
          border-radius: var(--spacing-small);
          border: 1px solid var(--color-black);
        }
      </style>
      <div>
        <button id="plus">+</button>
        <button id="minus">-</button>
        <button id="reset">0</button>
      </div>
    `
  }

  static get observedAttributes() {
    return ['visible']
  }

  #render() {
    if (this.#visible) {
      this.shadowRoot.querySelector('div').style.height = 'calc(var(--spacing-xxxlarge) + 2 * var(--spacing-small))'
    } else {
      this.shadowRoot.querySelector('div').style.height = '0'
    }
  }

  #plus(e) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('plus'))
  }

  #minus(e) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('minus'))
  }

  #reset(e) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('reset'))
  }

  connectedCallback() {
    this.#visible = this.hasAttribute('visible')
    this.shadowRoot.querySelector('#plus').addEventListener('click', this.#plus.bind(this))
    this.shadowRoot.querySelector('#minus').addEventListener('click', this.#minus.bind(this))
    this.shadowRoot.querySelector('#reset').addEventListener('click', this.#reset.bind(this))
    this.#render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'visible') {
      this.#visible = this.hasAttribute('visible')
      this.#render()
    }
  }
}

customElements.define('vote-setter', VoteSetter)
