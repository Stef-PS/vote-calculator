class VoteRow extends HTMLElement {
  #header = null
  #main = null
  #footer = null
  #index = null
  #vote = [0, 0, 0, 0, 0]

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-small) var(--spacing-none);
        }
        main {
          flex: 1;
          display: flex;
          justify-content: space-between;
        }
        header {
          margin-right:var(--spacing-small);
        }
        footer {
          margin-left: var(--spacing-small);
          display: flex;
        }
        footer div {
          background-color: var(--color-yellow);
          width: var(--spacing-xlarge);
          height: var(--spacing-xlarge);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }
      </style>
      <header></header>
      <main></main>
      <footer>
        <div></div>
        <cross-icon></cross-icon>
      </footer>
    `
  }

  #render() {
    this.#header.innerText = `#${this.#index + 1}`
    this.#footer.innerText = this.#voteAverage()
    this.#main.innerHTML = ''
    this.#vote.forEach((vote, index) => {
      const card = document.createElement('vote-card')
      card.setAttribute('index', index + 1)
      card.setAttribute('voters', vote)
      this.#main.appendChild(card)
    })
  }

  #voteAverage() {
    const total = this.#vote.reduce((acc, vote) => acc + vote, 0)
    const sum = this.#vote.reduce((acc, vote, index) => acc + vote * (index + 1), 0)
    return total ? sum / total : 0
  }

  connectedCallback() {
    this.#header = this.shadowRoot.querySelector('header')
    this.#main = this.shadowRoot.querySelector('main')
    this.#footer = this.shadowRoot.querySelector('div')
    this.#index = parseInt(this.getAttribute('index'))
    this.#vote = this.getAttribute('vote').split(',').map(vote => parseInt(vote))
    const closeButton = this.shadowRoot.querySelector('cross-icon')
    closeButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('delete', { detail: this.#index }))
    })
    this.#render()
  }
}

customElements.define('vote-row', VoteRow)
