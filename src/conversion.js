
/* 
	HOW TO CONVERT...
	
	// kml to nmea
	convert.from({
		lat: 50.985435,
		lon: 11.321463
	}).to('nmea')
	
	// nmea to kml
	convert.from({
		lat: '5321.6802N',
		lon: '00630.3371W'
	}).to('kml')
	
	// jpeg to kml
	convert.from({
		lat: '55; 52; 6.000000000000008',
		lon: '4; 17; 19.799999999999258'
	}).to('kml')
*/

export default {
	
	// Google kml
	kml_ (value, axis) {
		let deg  = Math.floor(value)
		let minU = (value - deg) * 60
		let min  = Math.floor(minU)
		let sec  = (minU - min) * 60
		let pos  = value > 0
		let dir  = axis == 'lat'? (pos? 'N': 'S'): (pos? 'W': 'E')
		return {deg, min, sec, dir}
	},
	_kml (value, axis) {
		let sign = axis == 'lat' && value.dir == 'N' || value.dir == 'W'? 1: -1
		return sign * (value.deg + value.min / 60 + value.sec / 60 / 10)
	},
	
	// NMEA 0183
	nmea_ (value, axis) {
		let dir  = value.substr(value.length - 1, value.length)
		let deg  = parseInt(value.substr(0, 2))
		let minR = parseFloat(value.substr(2, value.length - 1))
		let min  = Math.floor(minR)
		let sec  = (minR - min) * 60
		return {deg, min, sec, dir}
	},
	_nmea (value, axis) {
		return `${value.deg}${value.min + value.sec / 60}${value.dir}`
	},
	
	// JPEG EXIF
	jpeg_ (value, axis) {
		let parts = value.split(';').map(val => parseFloat(val))
		let pos   = parts[0] > 0
		let dir   = axis == 'lat'? (pos? 'N': 'S'): (pos? 'W': 'E')
		return {deg: Math.abs(parts[0]), min: parts[1], sec: parts[2], dir}
	},
	_jpeg (value, axis) {
		let sign = axis == 'lat' && value.dir == 'N' || value.dir == 'W'? 1: -1
		return `${sign * value.deg}; ${value.min}; ${value.sec}`
	},
	
	// Conversion
	from (value) {
		// automatic from type detection
		let from = 
			value.lat.search(/[N|S]/) > -1? 'nmea':
			value.lat.search(';') > -1? 'jpeg': 'kml'
		// create method
		let convertAxis = (value, method) => {return {
			lat : this[method](value.lat, 'lat'),
			lon : this[method](value.lon, 'lon')}}
		// convert to uni
		let uni = convertAxis(value, `${from}_`)
		// return conversion function
		return {
			to : to => {
				let method = `_${to}`
				return this[method]? convertAxis(uni, method): uni
			}
		}
	}
}
