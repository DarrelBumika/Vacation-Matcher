import React from 'react'
import ReactDOM from 'react-dom/client'

import Landing from './pages/Landing'
import Sequences from './pages/Sequences'
import App from './pages/App'

import {
	BrowserRouter, 
	Routes,
	Route
} from 'react-router-dom'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={ <Landing /> } />
				<Route path='/sequences' element={ <Sequences /> } />
				<Route path='/process' element={ <App /> } />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
)
