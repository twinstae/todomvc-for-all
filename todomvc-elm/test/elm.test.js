import runTest from "../../test/runTest";
import { Elm } from '../src/App.elm'

runTest({
	framework: `elm`,
	render: async (init) => {
		const root = document.createElement('div');
		root.id = "root"
		document.body.appendChild(root);
					
		const app = Elm.App.init({
			node: root,
			flags: init,
		});
	},
});

afterEach(() => {
	document.body.innerHTML = '';
})