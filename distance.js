
let convert = require('./conversion')

let distanceInMeters = (a, b) => {
	let rad  = value => Number(value / 180.0 * Math.PI)
	let prad = v => {return {lat: rad(v.lat), lon: rad(v.lon)}}
	let A = prad(a)
	let B = prad(b)
	let t = 
		Math.pow(Math.sin((A.lat - B.lat) / 2), 2) + 
		Math.pow(Math.sin((A.lon - B.lon) / 2), 2) * 
		Math.cos(A.lat) * Math.cos(B.lat)
	return 6371 * 2 * Math.pow(Math.atan(Math.sqrt(t), Math.sqrt(1 - t)), 2)
}

let D1A = {lat: 50.974751, lon: 11.329992}
let D1B = {lat: 50.966975, lon: 11.337546}
console.log('D1A - D1B:', distanceInMeters(D1A, D1B), 'meters')

let D2A = convert.from({lat: '50; 59; 5.165', lon: '-11; 19; 7.882'}).to('kml')
let D2B = convert.from({lat: '5059.08608N', lon: '1119.13137E'}).to('kml')
console.log('D2A - D2B:', distanceInMeters(D2A, D2B), 'meters')

let D3A = {lat: 52.518715, lon: 13.388361}
let D3B = {lat: 40.735649, lon: -74.010222}
console.log('D3A - D3B:', distanceInMeters(D3A, D3B), 'meters')
