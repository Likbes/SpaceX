import * as React from 'react';
import { LaunchProfileQuery } from '../../generated/graphql';
import './styles.css';

interface Props {
  data: LaunchProfileQuery;
}

const className = 'LaunchProfile';

const LaunchProfile: React.FC<Props> = ({ data }) => {
  if (!data.launch) {
    return <div>No launch available</div>;
  }

  const {
    flight_number,
    launch_success,
    mission_name,
    rocket,
    links,
    details
  } = data.launch;

  return (
    <div className={className}>
      <div className={`${className}__status`}>
        <span>Flight {flight_number}: </span>
        {launch_success ? (
          <span className={`${className}__success`}>Success</span>
        ) : (
            <span className={`${className}__failed`}>Failed</span>
          )}
      </div>
      <h1 className={`${className}__title`}>
        {mission_name}
        {rocket &&
          ` (${rocket.rocket_name} | ${rocket.rocket_type})`}
      </h1>
      <p className={`${className}__description`}>{details}</p>
      {!!links && !!links.flickr_images && (
        <div className={`${className}__image-list`}>
          {links.flickr_images.map(image =>
            image
              ? <img
                src={image}
                className={`${className}__image`}
                key={image}
                alt={image}
              />
              : null,
          )}
        </div>
      )}
    </div>
  );
};

export default LaunchProfile;
