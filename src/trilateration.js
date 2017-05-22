
// Based on: http://stackoverflow.com/a/3349134
// https://gist.github.com/alanctkc/8566411
export default {
	distance (a, b) {
		return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
	},
	intersect (a, b) {
		// Find the points of intersection for two circles
		var d = this.distance(a.c, b.c)
		if (d > a.r + b.r 				// Circles do not overlap
		||	d < Math.abs(a.r - b.r) 	// One circle contains the other
		||	d == 0 && a.r == b.r 		// These are the same circle
		) return {}
		// Find distances of dimensions from the first point
		var c = (Math.pow(a.r, 2) - Math.pow(b.r, 2) + Math.pow(d, 2)) / (2 * d)
		var h = Math.sqrt(Math.pow(a.r, 2) - Math.pow(c, 2))
		// Determine point on the line between centers perpendicular to intersects
		var p = {
			x : a.c.x + c * (b.c.x - a.c.x) / d, 
			y : a.c.y + c * (b.c.y - a.c.y) / d}
		// Calculate intersection points
		return {
			a : {
				x : p.x + h * (b.c.y - a.c.y) / d, 
				y : p.y - h * (b.c.x - a.c.x) / d},
			b : {
				x : p.x - h * (b.c.y - a.c.y) / d, 
				y : p.y + h * (b.c.x - a.c.x) / d}}
	},
	trilaterate (p) {
		var inters = []
		for (var i = 0; i < p.length; i ++) {
			var two  = this.intersect(p[i], p[(i + 1) % p.length])
			var next = p[(i + 2) % p.length]
			inters.push(
				{off: Math.abs(this.distance(two.a, next.c) - next.r), point: two.a}, 
				{off: Math.abs(this.distance(two.b, next.c) - next.r), point: two.b})
		}
		// Find the most precisely triangulated point
		return inters.sort((a, b) => a.off > b.off)[0].point
	}
}
