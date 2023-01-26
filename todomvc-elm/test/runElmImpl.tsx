import runTest from "../../test/runTest";
import { Elm } from '../src/App.elm'
export function runElmImpl(
  name: string,
) {
  runTest({
    framework: `elm: ${name}`,
    render: async (init) => {
			const root = document.createElement('div');
			root.id = "root"
			document.body.appendChild(root);
						
			const app = Elm.App.init({
				node: root,
				flags: init,
			});

			// app.ports.jsonConsole.subscribe(console.log)
    },
  });
}


afterEach(() => {
	document.body.innerHTML = "";
})