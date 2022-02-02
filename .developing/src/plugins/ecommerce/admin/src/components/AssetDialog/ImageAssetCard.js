import React from 'react';
import styled from 'styled-components';
import getTrad from '../../utils/getTrad';

import PropTypes from 'prop-types';
import Pencil from '@strapi/icons/Pencil';
import { IconButton } from '@strapi/design-system/IconButton';
import { useIntl } from 'react-intl';
import {
  Card,
  CardAction,
  CardAsset,
  CardBadge,
  CardBody,
  CardCheckbox,
  CardContent,
  CardHeader,
  CardTitle,
  CardSubtitle,
} from '@strapi/design-system/Card';


const Extension = styled.span`
  text-transform: uppercase;
`;

export const ImageAssetCard = ({
  name,
  extension,
  height,
  width,
  asset,
  thumbnail,
  selected,
  onSelect,
  onEdit,
  size,
  alt,
}) => {
  const { formatMessage } = useIntl();
  const optimizedCachingThumbnail =
    width && height ? `${thumbnail}?width=${width}&height=${height}` : thumbnail;

  let handleSelect = onSelect ? () => onSelect(asset) : undefined;

  return (
    <Card>
      <CardHeader>
        {onSelect && <CardCheckbox value={selected} onValueChange={handleSelect}/>}
        {onEdit && (
          <CardAction position="end">
            <IconButton
              label={formatMessage({ id: getTrad('control-card.edit'), defaultMessage: 'Edit' })}
              icon={<Pencil />}
              onClick={() => onEdit(asset)}
            />
          </CardAction>
        )}
        <CardAsset src={optimizedCachingThumbnail} size={size} alt={alt} />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle as="h2">{name}</CardTitle>
          <CardSubtitle>
            <Extension>{extension}</Extension>
            {height && width && ` - ${height}✕${width}`}
          </CardSubtitle>
        </CardContent>
        <CardBadge>
          {formatMessage({ id: getTrad('settings.section.image.label'), defaultMessage: 'Image' })}
        </CardBadge>
      </CardBody>
    </Card>
  );
};

ImageAssetCard.defaultProps = {
  height: undefined,
  width: undefined,
  selected: false,
  onEdit: undefined,
  onSelect: undefined,
  size: 'M',
};

ImageAssetCard.propTypes = {
  alt: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
  height: PropTypes.number,
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func,
  width: PropTypes.number,
  thumbnail: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['S', 'M']),
};
