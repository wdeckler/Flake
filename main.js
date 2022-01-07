const PI = Math.PI, PI2 = PI * 2;

var dsp = null;
var dc = null;

function init()
{
	hd = document.getElementById("hd")
	hd.innerHTML = document.title;
	
	dsp = document.getElementById("dsp");
	dsp.style.height = "100%";
	dsp.style.width = "100%";
	
	dc = dsp.getContext("2d");

	setInterval(anim, 500)	
}

function anim(t, dt)
{
	drawFlake(200, 200, 180, 180);
}

function drawShape(x_ds, y_ds, w_ds, h_ds, n_points)
{
	var cx = x_ds+(w_ds/2);
	var cy = y_ds+(h_ds/2);
	
	var pts = [];
	var npts = n_points;
	
	var r = 0;
	
	var wider = (w_ds>h_ds) ? true : false;
	if(wider) r = h_ds/2;
	else r = w_ds/2;
	
	for (var i = (PI2 / npts); i <= PI2; i += (PI2 / npts))
	{
		pts.push({
			x: cx + (Math.cos(i) * r),
			y: cy + (Math.sin(i) * r)
		});
	}
	
	dc.strokeStyle = randColor();
	dc.lineWidth = 1;
	dc.lineJoin = "round";
	
	dc.beginPath();
	dc.moveTo(cx, cy);
	
	for (var i = 0; i < pts.length; i++)
	{
		dc.lineTo(pts[i].x, pts[i].y);
		dc.moveTo(cx, cy);
	}
	dc.closePath();
	dc.stroke();

	return pts
}

function drawFlake(x_df, y_df, w_df, h_df)
{
	const N_POINTS = 9;

	var lv2 = drawShape(x_df, y_df, w_df, h_df, N_POINTS);

	for(var idf2=0; idf2<lv2.length; idf2++)
	{
		var x2 = lv2[idf2].x - (w_df/2);
		var y2 = lv2[idf2].y - (h_df/2);
		
		var lv3 = drawShape(x2, y2, w_df/2, h_df/2, N_POINTS);

		for(var idf3=0; idf3<lv3.length; idf3++)
		{
			var x3 = lv3[idf3].x - (w_df/3);
			var y3 = lv3[idf3].y - (h_df/3);
		
			drawShape(x3, y3, w_df, h_df, N_POINTS);
		}
	}
}

function randColor()
{
	var red = parseInt(Math.random() * 0xff).toString(16);
	if(red.length < 2) red = "0" + red;
	
	var green = parseInt(Math.random() * 0xff).toString(16);
	if(green.length < 2) green = "0" + green;
	
	var blue = parseInt(Math.random() * 0xff).toString(16);
	if(blue.length < 2) blue = "0" + blue;
	
	var out_str = "#" + red + green + blue;
	return out_str;
}