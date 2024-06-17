import './SpotImages.css';

const SpotImages = ({ image }) => {

	// console.log('IMAGE', image)

	console.log(imageIndex)

	const imageClass = image.previewImage ? 'preview-image' : `image`;

	return (
		<div>
			<img className={imageClass} src={image.url} />
		</div>
	)
}

export default SpotImages;
