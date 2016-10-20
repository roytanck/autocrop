window.onload = function(){

	img = document.getElementById('image');
	imgWidth = img.clientWidth;
	imgHeight = img.clientHeight;
	blockSize = 15;
	blocksArray = [];
	nrofWinners = 20;

	var canvas = document.createElement('canvas');
	canvas.id     = "canvas";
	canvas.width  = imgWidth;
	canvas.height = imgHeight;
	document.getElementById('canvasholder').appendChild(canvas);
	context = canvas.getContext('2d');

	var imageObj = new Image();
	imageObj.onload = function(){
		context.drawImage( imageObj, 0, 0 );
		init( context );
	};
	imageObj.src = img.src;
}

function init(){
	var blocksX = Math.floor( imgWidth / blockSize );
	var blocksY = Math.floor( imgHeight / blockSize );
	for( var bx=0; bx<blocksX; bx++ ){
		var line = [];
		for( var by=0; by<blocksY; by++ ){
			var v = analyzeBlock( bx, by, 2 );
			line.push( v );
			// draw a block overlay
			context.beginPath();
			context.lineWidth = '0.25';
			context.strokeStyle = 'white';
			context.fillStyle = 'rgba( 255, 0, 0, ' + (v*5) + ' )';
			context.rect( bx*blockSize, by*blockSize, blockSize, blockSize );
			context.stroke();
			context.fill();
		}
		blocksArray.push( line );
	}
	//console.log( blocksArray );
	var winners = findTopBlocks();
	drawWinners( winners );
	drawRecommendedCrop( winners );
}

function analyzeBlock( bx, by, method ){
	var variance = 0;
	switch( method ){
		case 1:
			var maxVariance = blockSize * blockSize * 256 * 3;
			var prevPixel;
			for( var x=0; x<blockSize; x++ ){
				for( var y=0; y<blockSize; y++ ){
					var pixel = context.getImageData( (bx*blockSize)+x, (by*blockSize)+y, 1, 1 ).data;
					if( prevPixel != undefined ){
						variance += Math.abs( prevPixel[0] - pixel[0] ) + Math.abs( prevPixel[1] - pixel[1] ) + Math.abs( prevPixel[2] - pixel[2] );
					}
					prevPixel = pixel;
				}
			}
			break;
		case 2:
			var maxVariance = blockSize * 256 * 4 * 3;
			var prev1, prev2, prev3, prev4;
			for( var i=0; i<blockSize; i++ ){
				// vertical
				var pixel = context.getImageData( (bx*blockSize)+i, (by*blockSize)+Math.floor(blockSize/2), 1, 1 ).data;
				if( prev1 != undefined ){
					variance += Math.abs( prev1[0] - pixel[0] ) + Math.abs( prev1[1] - pixel[1] ) + Math.abs( prev1[2] - pixel[2] );
				}
				prev1 = pixel;
				// horizontal
				var pixel = context.getImageData( (bx*blockSize)+Math.floor(blockSize/2), (by*blockSize)+i, 1, 1 ).data;
				if( prev2 != undefined ){
					variance += Math.abs( prev2[0] - pixel[0] ) + Math.abs( prev2[1] - pixel[1] ) + Math.abs( prev2[2] - pixel[2] );
				}
				prev2 = pixel;
				// daigonal 1
				var pixel = context.getImageData( (bx*blockSize)+i, (by*blockSize)+i, 1, 1 ).data;
				if( prev3 != undefined ){
					variance += Math.abs( prev3[0] - pixel[0] ) + Math.abs( prev3[1] - pixel[1] ) + Math.abs( prev3[2] - pixel[2] );
				}
				prev3 = pixel;
				// daigonal 2
				var pixel = context.getImageData( (bx*blockSize)+i, (by*blockSize)+(blockSize-i), 1, 1 ).data;
				if( prev4 != undefined ){
					variance += Math.abs( prev4[0] - pixel[0] ) + Math.abs( prev4[1] - pixel[1] ) + Math.abs( prev4[2] - pixel[2] );
				}
				prev4 = pixel;
			}
			break;
	}
	return( variance / maxVariance );
}

function findTopBlocks(){
	var all = [];
	for( var x=0; x<blocksArray.length; x++ ){
		for( var y=0; y<blocksArray[x].length; y++ ){
			all.push({
				x:x,
				y:y,
				v:blocksArray[x][y]
			});
		}
	}
	all.sort( function( a, b ){ return b.v - a.v; } );
	winners = all.splice( 0, nrofWinners );
	//console.log( winners );
	return winners;
}

function drawWinners( w ){
	for( var i=0; i<w.length; i++ ){
		context.beginPath();
		context.strokeStyle = 'white';
		context.lineWidth = '1';
		context.rect( w[i].x*blockSize, w[i].y*blockSize, blockSize, blockSize );
		context.stroke();
	}
}

function drawRecommendedCrop( w ){
	var xs = 0;
	var ys = 0;
	for( var i=0; i<w.length; i++ ){
		xs += ( w[i].x * blockSize ) + Math.floor( blockSize/2 );
		ys += ( w[i].y * blockSize ) + Math.floor( blockSize/2 );;
	}
	var avgx = Math.round( xs / w.length );
	var avgy = Math.round( ys / w.length );
	console.log( avgx );

	if( imgWidth > imgHeight ){
		// landscape
		var cropSize = imgHeight;
		var cropx = Math.max( avgx-Math.floor(cropSize/2), 0 );
		var cropy = 0;
	} else {
		// portrait
		var cropSize = imgWidth;
		var cropx = 0;
		var cropy = Math.max( avgy-Math.floor(cropSize/2), 0 );
	}
	
	context.beginPath();
	context.strokeStyle = '#66ff66';
	context.lineWidth = '3';
	context.rect( cropx, cropy, cropSize, cropSize );
	context.stroke();
}
