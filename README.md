# Vote Calculator

This is a tool to help calculating the averages during the cofidence votes at the end of PI plannings.

It's published on Netlify at https://jovial-naiad-cbda7a.netlify.app/

## Usage

- To add rows, hit the pink button at bottom.
- To remove a row, hit the row's closing cross on the right.
- To add votes, hit a light blue card: it goes dark blue and controls appear at bottom.
- Press + to increment votes for this card, press - to decrement and press 0 to remove votes on this card.
- Press anywhere but another card to make the controls disappear.
- If you press another card while controls are up, they control the newly pressed card.
- if you press twice the highlighted card, the controls disappear.

Simply add as much rows as you want, then select cards and increment or decrement the number of votes for each one. The row averages are caculated in real time in the right yellow circle and the overall average the same on top.

The state is simply persisted in the browser's local storage. So if you reconnect from the same browser, you will retrieve your last settings.

## Development

If you want to contribute, it's a zero dependancy pure static website, with nothing to install or build. Simply clone and launch a local server pointing to the index.html file. You can't open it durectly with a borwser because of CORS. As a server, you can for example use Live Server (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) if you are on Visual Studio Code, or any node.js server like https://www.npmjs.com/package/http-server.

The index.hmtl file involves a bunch of web-components made in vanilla JS located in the components directory.

You can make a pull request from your cloned branch to the original repository using the usual github methods.
