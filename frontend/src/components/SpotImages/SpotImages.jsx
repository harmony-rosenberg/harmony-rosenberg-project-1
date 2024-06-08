const SpotImages = ({ image }) => {
	console.log(image)
	return (
		<div className='images'>
			<img src={image.url} />
		</div>
	)
}

export default SpotImages;
