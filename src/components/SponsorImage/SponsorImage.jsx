import CloudinaryImage from '../CloudinaryImage/CloudinaryImage';

const SponsorImage = ({ src, alt, className, ...props }) => {
  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      className={className}
      width={105}
      height={70}
      quality="70"
      crop="fit"
      sizes="(max-width: 768px) 50vw, 105px"
      {...props}
    />
  );
};

export default SponsorImage;