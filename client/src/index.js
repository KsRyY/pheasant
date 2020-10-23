/* eslint-env browser */
import './assets/css/style.css'

const title = document.createElement('h1')
title.textContent = 'Hello Poi!'
title.className = 'title'

const tip = document.createElement('div')
tip.textContent = 'Edit src/index.js and save to reload.'
tip.className = 'tip'

const app = document.querySelector('#app')

if (app) {
	app.append(title)
	app.append(tip)
}
