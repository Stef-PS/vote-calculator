class VoteCard extends HTMLElement {
  #index = 0
  #voters = 0
  #value = null
  #aside = null
  #active = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: var(--spacing-xxlarge);
          height: var(--spacing-xxlarge);
          position: relative;
        }
        main {
          text-align: center;
          padding: 1rem;
          position: relative;
          background-color: var(--color-blue);
          color: var(--color-black);
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
        .active {
          background-color: var(--color-blue-dark);
          color: var(--color-white);
        }
      </style>
      <main></main>
      <aside></aside>
    `
  }

  #render() {
    this.#value.innerText = (this.#index + 1).toString()
    this.#aside.innerText = this.#voters.toString()
    this.#aside.style.display = this.#voters ? 'flex' : 'none'
    this.#value.classList.toggle('active', this.#active)
  }

  #showNav(e) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('show-nav', { detail: { rank: this.#index } }))
  }

  connectedCallback() {
    this.#index = parseInt(this.getAttribute('index'))
    this.#voters = parseInt(this.getAttribute('voters'))
    this.#active = this.hasAttribute('active')
    this.#value = this.shadowRoot.querySelector('main')
    this.#aside = this.shadowRoot.querySelector('aside')
    this.#value.addEventListener('click', this.#showNav.bind(this))
    this.#render()
  }
}

customElements.define('vote-card', VoteCard)
