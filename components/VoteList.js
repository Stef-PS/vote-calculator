export class VoteList extends HTMLElement {
  #global = null
  #ul = null
  #addButton = null
  #list = []
  #active = { index: -1, rank: -1 }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          text-align: center;
          width: 100%;
        }
        main {
          height: calc(100% - var(--header-height));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        header { padding: var(--spacing-large); }
        footer { padding: var(--spacing-medium); }
        ul {
          overflow: auto;
          flex: 1;
          list-style: none;
          margin: var(--spacing-none);
          padding: var(--spacing-none) var(--spacing-small);
          width: 100%;
        }
        footer button {
          background-color: var(--color-pink);
          padding: var(--spacing-small) var(--spacing-medium);
          border: none;
          touch-action: manipulation;
        }
      </style>
      <main>
        <header>
          Total average = <span></span>
        </header>
        <ul></ul>
        <footer>
          <button>
            Ajouter une ligne
          </button>
        </footer>
        <vote-setter></vote-setter>
      </main>
    `
  }

  #render() {
    this.#ul.innerHTML = ''
    this.#list.forEach((vote, index) => {
      const row = document.createElement('vote-row')
      row.setAttribute('index', index)
      row.setAttribute('vote', vote)
      if (index === this.#active.index) row.setAttribute('active', true)
      row.setAttribute('active-rank', this.#active.rank)
      row.addEventListener('delete', this.#deleteRow.bind(this))
      row.addEventListener('show-nav', this.#showNav.bind(this))
      this.#ul.appendChild(row)
    })
    this.#global.innerText = Math.round(100 * this.#totalAverage()) / 100
    localStorage.setItem('vote-list', JSON.stringify(this.#list))
  }

  #showNav({ detail: { index, rank } }) {
    if (this.#active.index === index && this.#active.rank === rank) {
      this.#hideNav()
      return
    }
    this.#active = { index, rank }
    this.shadowRoot.querySelector('vote-setter').setAttribute('visible', true)
    this.#render()
  }

  #hideNav() {
    this.#active = { index: -1, rank: -1 }
    this.shadowRoot.querySelector('vote-setter').removeAttribute('visible')
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

  #increment() {
    console.log('increment')
    if (this.#active.index === -1 || this.#active.rank === -1) return
    this.#list[this.#active.index][this.#active.rank]++
    this.#render()
  }

  #decrement() {
    if (this.#active.index === -1 || this.#active.rank === -1) return
    if (this.#list[this.#active.index][this.#active.rank] === 0) return
    this.#list[this.#active.index][this.#active.rank]--
    this.#render()
  }

  #reset() {
    if (this.#active.index === -1 || this.#active.rank === -1) return
    this.#list[this.#active.index][this.#active.rank] = 0
    this.#render()
  }

  connectedCallback() {
    const stored = localStorage.getItem('vote-list')
    this.#list = stored ? JSON.parse(stored) : []
    this.#ul = this.shadowRoot.querySelector('ul')
    this.#addButton = this.shadowRoot.querySelector('button')
    this.#addButton.addEventListener('click', this.#addRow.bind(this))
    this.shadowRoot.querySelector('main').addEventListener('click', this.#hideNav.bind(this))
    const setter = this.shadowRoot.querySelector('vote-setter')
    setter.addEventListener('plus', this.#increment.bind(this))
    setter.addEventListener('minus', this.#decrement.bind(this))
    setter.addEventListener('reset', this.#reset.bind(this))
    this.#global = this.shadowRoot.querySelector('header span')
    this.#render()
  }
}

customElements.define('vote-list', VoteList)
