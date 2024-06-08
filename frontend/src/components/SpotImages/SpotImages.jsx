import './SpotImages.css';

const SpotImages = ({ image }) => {

	const imageClass = image.previewImage ? 'preview-image' : 'image';

	return (
		<div className='images-card'>
			<img className={imageClass} src={image.url} />
		</div>
	)
}

export default SpotImages;
