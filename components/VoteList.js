export class VoteList extends HTMLElement {
  #global = null
  #ul = null
  #addButton = null
  #list = []

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        ul {
          list-style: none;
          margin: var(--spacing-none);
          padding: var(--spacing-none) var(--spacing-small);
        }
      </style>
      <header>
        Total average = <span></span>
      </header>
      <ul></ul>
      <footer>
        <button>
          Ajouter une ligne
        </button>
      </footer>
    `
  }

  #render() {
    this.#ul.innerHTML = ''
    this.#list.forEach((vote, index) => {
      const row = document.createElement('vote-row')
      row.setAttribute('index', index)
      row.setAttribute('vote', vote)
      row.addEventListener('delete', this.#deleteRow.bind(this))
      row.addEventListener('update', this.#update.bind(this))
      this.#ul.appendChild(row)
    })
    this.#global.innerText = Math.round(100 * this.#totalAverage()) / 100
    localStorage.setItem('vote-list', JSON.stringify(this.#list))
  }

  #update({ detail: { index, vote } }) {
    this.#list[index] = vote
    this.#render()
  }

  #addRow() {
    this.#list.push([0, 0, 0, 0, 0])
    this.#render()
  }

  #deleteRow({ detail: index }) {
    this.#list.splice(index, 1)
    this.#render()
  }

  #voteAverage(vote) {
    const total = vote.reduce((acc, vote) => acc + vote, 0)
    const sum = vote.reduce((acc, vote, index) => acc + vote * (index + 1), 0)
    return total ? sum / total : 0
  }

  #totalAverage() {
    const votes = [0, 0, 0, 0, 0]
    this.#list.forEach(vote => {
      vote.forEach((vote, index) => {
        votes[index] += vote
      })
    })
    return this.#voteAverage(votes)
  }

  connectedCallback() {
    const stored = localStorage.getItem('vote-list')
    this.#list = stored ? JSON.parse(stored) : []
    this.#ul = this.shadowRoot.querySelector('ul')
    this.#addButton = this.shadowRoot.querySelector('button')
    this.#addButton.addEventListener('click', this.#addRow.bind(this))
    this.#global = this.shadowRoot.querySelector('header span')
    this.#render()
  }
}

customElements.define('vote-list', VoteList)
