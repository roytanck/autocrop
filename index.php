<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Autocrop experiment</title>
		<style type="text/css">
			body {
				background-color: #333;
				color: #ddd;
				font-family: sans-serif;
				font-size: 16px;
				padding: 1em 1em;
			}
			.block {
				/*float: left;*/
				padding: 0;
				font-size: 0px;
			}
			.block img {
				height: 250px;
				width: auto;
				margin: 0 20px 5px 0;
				border: 1px solid rgba(255,255,255,0.5);				
			}
			p.credit {
				font-size: 0.75em;
				margin: 0 0 30px 0;
			}
			a {
				color: #fff !important;
			}
		</style>
	</head>
	<body>

		<p id="source" class="block">
			<img src="autocrop.php?img=images/image1.jpg&w=250&h=250&demo=true" alt="cropped image" class="original" />
			<img src="autocrop.php?img=images/image1.jpg&w=250&h=250" alt="cropped image" />
			<p class="credit">Photo by <a href="https://unsplash.com/@dsmacinnes">Danielle MacInnes</a></p>
		</p>

		<p id="source" class="block">
			<img src="autocrop.php?img=images/image2.jpg&w=250&h=250&demo=true" alt="cropped image" class="original" />
			<img src="autocrop.php?img=images/image2.jpg&w=250&h=250" alt="cropped image" />
			<p class="credit">Photo by <a href="https://unsplash.com/@chrisjoelcampbell">Christopher Campbell</a></p>
		</p>

		<p id="source" class="block">
			<img src="autocrop.php?img=images/image3.jpg&w=250&h=250&demo=true" alt="cropped image" class="original" />
			<img src="autocrop.php?img=images/image3.jpg&w=250&h=250" alt="cropped image" />
			<p class="credit">Photo by <a href="https://unsplash.com/@spiritvisionstudios">Ben Rosett</a></p>
		</p>

		<p id="source" class="block">
			<img src="autocrop.php?img=images/image4.jpg&w=250&h=250&demo=true" alt="cropped image" class="original" />
			<img src="autocrop.php?img=images/image4.jpg&w=250&h=250" alt="cropped image" />
			<p class="credit">Photo by <a href="https://unsplash.com/@wexor">Wexor Tmg</a></p>
		</p>

		<p id="source" class="block">
			<img src="autocrop.php?img=images/image5.jpg&w=250&h=250&demo=true" alt="cropped image" class="original" />
			<img src="autocrop.php?img=images/image5.jpg&w=250&h=250" alt="cropped image" />
			<p class="credit">Photo by <a href="https://unsplash.com/@jeffkingla">Jeff King</a></p>
		</p>

		<p id="source" class="block">
			<img src="autocrop.php?img=images/image6.jpg&w=250&h=250&demo=true" alt="cropped image" class="original" />
			<img src="autocrop.php?img=images/image6.jpg&w=250&h=250" alt="cropped image" />
			<p class="credit">Photo by <a href="https://unsplash.com/@rickpsd">Henrique Ferreira</a></p>
		</p>

	</body>
</html>