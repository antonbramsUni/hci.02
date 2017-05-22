
import '../graphic/style.sass'
import convert from './conversion'
import distance from './distance'
import trilateration from './trilateration'

let print = document.querySelectorAll('.value')

// DISTANCE
let D1A = {lat: 50.974751, lon: 11.329992}
let D1B = {lat: 50.966975, lon: 11.337546}
let d1ad1b = distance.calculate(D1A, D1B)
console.log('D1A - D1B:', d1ad1b, 'meters')
print[0].innerHTML = d1ad1b + ' meters'

let D2A = convert.from({lat: '50; 59; 5.165', lon: '-11; 19; 7.882'}).to('kml')
let D2B = convert.from({lat: '5059.08608N', lon: '1119.13137E'}).to('kml')
let d2ad2b = distance.calculate(D2A, D2B)
console.log('D2A - D2B:', d2ad2b, 'meters')
print[1].innerHTML = d2ad2b + ' meters'

let D3A = {lat: 52.518715, lon: 13.388361}
let D3B = {lat: 40.735649, lon: -74.010222}
let d3ad3b = distance.calculate(D3A, D3B)
console.log('D3A - D3B:', d3ad3b, 'meters')
print[2].innerHTML = d3ad3b + ' meters'

// TRILATERATION
let points = [
	{c : {x:  0, y:  0}, r : 12.6},
	{c : {x: 20, y:  0}, r : 10.8},
	{c : {x:  5, y: 15}, r : 21.8},
	{c : {x: 18, y: 12}, r : 19.2}
]
// document.querySelectorAll('.sub')[3].innerHTML = JSON.stringify(points)
let trilaterationResult = trilateration.trilaterate(points)
console.log(trilaterationResult)
print[3].innerHTML = `x : ${trilaterationResult.x}<br> y : ${trilaterationResult.y}`