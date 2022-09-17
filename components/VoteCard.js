class VoteCard extends HTMLElement {
  #index = 0
  #voters = 0
  #main = null
  #aside = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 3rem;
          background-color: lightblue;
          position: relative;
        }
        main {
          text-align: center;
          padding: 1rem;
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
      </style>
      <main></main>
      <aside></aside>
    `
  }

  #render() {
    this.#main.innerText = this.#index.toString()
    this.#aside.innerText = this.#voters.toString()
    this.#aside.style.display = this.#voters ? 'flex' : 'none'
  }

  connectedCallback() {
    this.#index = parseInt(this.getAttribute('index'))
    this.#voters = parseInt(this.getAttribute('voters'))
    this.#main = this.shadowRoot.querySelector('main')
    this.#aside = this.shadowRoot.querySelector('aside')
    this.#render()
  }
}

customElements.define('vote-card', VoteCard)
