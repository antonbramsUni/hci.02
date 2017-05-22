
export default {
	calculate (a, b) {
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
}
