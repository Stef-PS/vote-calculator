class VoteRow extends HTMLElement {
  #header = null
  #main = null
  #footer = null
  #index = null
  #vote = [0, 0, 0, 0, 0]
  #activeRank = -1
  #active = true

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: var(--spacing-none) var(--spacing-small) var(--spacing-small);
          margin: 0 auto;
        }
        main {
          flex: 1;
          max-width: 260px;
          display: flex;
          justify-content: space-between;
        }
        header {
          margin-right:var(--spacing-medium);
          width: var(--spacing-large);
          font-size: 85%;
          font-style: italic;
        }
        footer {
          margin-left: var(--spacing-medium);
          display: flex;
        }
        footer div {
          background-color: var(--color-yellow);
          width: var(--spacing-xxlarge);
          height: var(--spacing-xxlarge);
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
    this.#vote.forEach((vote, rank) => {
      const card = document.createElement('vote-card')
      card.setAttribute('index', rank)
      card.setAttribute('voters', vote)
      if (this.#active && this.#activeRank === rank) card.setAttribute('active', true)
      card.addEventListener('show-nav', this.#showNav.bind(this))
      this.#main.appendChild(card)
    })
  }

  #showNav(e) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('show-nav', { detail: { index: this.#index, rank: e.detail.rank } }))
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
    this.#active = this.hasAttribute('active')
    this.#activeRank = parseInt(this.getAttribute('active-rank'))
    const closeButton = this.shadowRoot.querySelector('cross-icon')
    closeButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('delete', { detail: this.#index }))
    })
    this.#render()
  }
}

customElements.define('vote-row', VoteRow)
