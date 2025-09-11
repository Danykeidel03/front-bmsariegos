const SEOLink = ({ 
  href, 
  children, 
  external = false, 
  ariaLabel, 
  className = '',
  ...props 
}) => {
  const linkProps = {
    href: href || '#',
    className,
    'aria-label': ariaLabel || (typeof children === 'string' ? children : undefined),
    ...props
  };

  if (external && href && href !== '#') {
    linkProps.target = '_blank';
    linkProps.rel = 'noopener noreferrer';
  }

  return <a {...linkProps}>{children}</a>;
};

export default SEOLink;