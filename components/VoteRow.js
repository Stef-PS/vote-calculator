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
          padding: var(--spacing-none) var(--spacing-none) var(--spacing-small);
        }
        main {
          flex: 1;
          display: flex;
          justify-content: space-between;
        }
        header {
          margin-right:var(--spacing-small);
          font-size: 85%;
          font-style: italic;
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
      card.setAttribute('index', index)
      card.setAttribute('voters', vote)
      card.addEventListener('update', this.#update.bind(this))
      this.#main.appendChild(card)
    })
  }

  #update({ detail: { index, voters } }) {
    this.#vote[index] = voters
    this.dispatchEvent(new CustomEvent('update', { detail: { index: this.#index, vote: this.#vote } }))
    this.#render()
  }

  #voteAverage() {
    const total = this.#vote.reduce((acc, vote) => acc + vote, 0)
    const sum = this.#vote.reduce((acc, vote, index) => acc + vote * (index + 1), 0)
    return total ? Math.round(100* sum / total) / 100 : 0
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
