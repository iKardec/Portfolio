export function ProjectCard({ title, description, tags, href, image }) {
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? { href, target: '_blank', rel: 'noreferrer' }
    : {};

  return (
    <Wrapper {...wrapperProps} className="glass-card project-card reveal">
      {image ? (
        <img
          src={image}
          alt={`Captura de tela do projeto ${title}`}
          className="project-card-image"
          loading="lazy"
        />
      ) : (
        <div className="project-card-placeholder" aria-hidden="true">
          <i className="fas fa-image" />
        </div>
      )}

      <div className="project-card-body">
        <h3>{title}</h3>
        <p>{description}</p>

        {tags?.length > 0 && (
          <ul className="project-card-tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        {href && (
          <span className="project-card-link">
            Ver projeto <i className="fas fa-arrow-right" aria-hidden="true" />
          </span>
        )}
      </div>
    </Wrapper>
  );
}
