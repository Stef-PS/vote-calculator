class VoteCard extends HTMLElement {
  #index = 0
  #voters = 0
  #value = null
  #aside = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 3rem;
          background-color: var(--color-blue);
          position: relative;
        }
        main {
          text-align: center;
          padding: 1rem;
          position: relative;
          font-weight: bold;
          font-size: 105%;
        }
        aside {
          position: absolute;
          top: calc(var(--spacing-small) / -2);
          right: calc(var(--spacing-small) / -2);
          width: var(--spacing-large);
          height: var(--spacing-large);
          border-radius: 50%;
          background-color: var(--color-pink);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .plus, .minus {
          background-color: transparent;
          border: none;
          position: absolute;
          bottom: 0;
        }
        .plus { right: 0; }
        .minus { left: 0; }
      </style>
      <main>
        <div></div>
        <button class="plus">+</button>
        <button class="minus">-</button>
      </main>
      <aside></aside>
    `
  }

  #render() {
    this.#value.innerText = (this.#index + 1).toString()
    this.#aside.innerText = this.#voters.toString()
    this.#aside.style.display = this.#voters ? 'flex' : 'none'
  }

  #increment() {
    this.#voters++
    this.dispatchEvent(new CustomEvent('update', { detail: { index: this.#index, voters: this.#voters } }))
    this.#render()
  }

  #decrement() {
    if (this.#voters) {
      this.#voters--
      this.dispatchEvent(new CustomEvent('update', { detail: { index: this.#index, voters: this.#voters } }))
      this.#render()
    }
  }

  connectedCallback() {
    this.#index = parseInt(this.getAttribute('index'))
    this.#voters = parseInt(this.getAttribute('voters'))
    this.#value = this.shadowRoot.querySelector('main div')
    this.#aside = this.shadowRoot.querySelector('aside')
    this.shadowRoot.querySelector('.plus').addEventListener('click', () => this.#increment())
    this.shadowRoot.querySelector('.minus').addEventListener('click', () => this.#decrement())
    this.#render()
  }
}

customElements.define('vote-card', VoteCard)
