import * as vscode from 'vscode';
import * as WebRequest from 'web-request';
let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	console.log('Taco Tiempo is active');

	// taco command
	let disposable = vscode.commands.registerCommand('extension.taco', () => {

		(async function () {

			// grab the taco json
			var url = "http://taco-randomizer.herokuapp.com/random";
			var taco = await WebRequest.json<any>(url);

			// extract ingredients
			var shell = taco.shell.name.toLowerCase();
			var mixin = taco.mixin.name.toLowerCase();
			var seasoning = taco.seasoning.name.toLowerCase();
			var condiment = taco.condiment.name.toLowerCase();
			var base = taco.base_layer.name.toLowerCase();

			// create and display message
			var message = "Add " + base + " with " + mixin + " and garnish it with " + condiment + ". Top it off with " + seasoning + " and wrap in " + shell + ".";
			vscode.window.showInformationMessage(message, {modal: false}, 'Go to site');
		
		})();

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
