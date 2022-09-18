# Vote Calculator

This is a tool to help calculating the averages during the cofidence votes at the end of PI plannings.

Simply add as much rows as you want, then select cards and increment or decrement the number of votes for each one. The row average is displayed in the right yellow circle and the overall average is displayed on top.

If you want to contribute, it's a zero dependancy pure static website, wit hnothing to install or build. Simply clone and launch a local server pointing to the index.html file. You can't open it durectly with a borwser because of CORS. As a server, you can for example use Live Server (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) if you are on Visual Studio Code, or any node.js server like https://www.npmjs.com/package/http-server.

The index.hmtl file involves a bunch of web-components located in the components directory.

The state is simply persisted in the browser's local storage.
