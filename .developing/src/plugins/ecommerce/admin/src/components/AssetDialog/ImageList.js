import React from 'react';
import styled from 'styled-components';
import { Box } from '@strapi/design-system/Box';
import { KeyboardNavigable } from '@strapi/design-system/KeyboardNavigable';
import { ImageAssetCard } from './ImageAssetCard';
import { getFileExtension, prefixFileUrlWithBackendUrl } from '@strapi/helper-plugin'

const GridColSize = {
  S: 180,
  M: 250,
};

const GridLayout = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${({ size }) => `${GridColSize[size]}px`}, 1fr));
  grid-gap: ${({ theme }) => theme.spaces[4]};
`;

export const ImageList = ({
  assets,
  onSelectAsset,
  selectedAssets,
  size,
  onEditAsset,
  }) => {

  return (
    <KeyboardNavigable tagName="article">
      <GridLayout size={size}>
        {assets.map((asset) => {
          const isSelected = Boolean(
            selectedAssets.find(currentAsset => currentAsset.id === asset.id)
          );
          return (
            <ImageAssetCard
              id={asset.id}
              key={asset.id}
              name={asset.name}
              asset={asset}
              alt={asset.alternativeText || asset.name}
              extension={getFileExtension(asset.ext)}
              height={asset.height}
              width={asset.width}
              thumbnail={prefixFileUrlWithBackendUrl(asset?.formats?.thumbnail?.url || asset.url)}
              onEdit={onEditAsset}
              onSelect={onSelectAsset}
              selected={isSelected}
            />
          );
        })}

        {/* TODO: Remove this when we have media queries */}
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
        <div aria-hidden />
      </GridLayout>
    </KeyboardNavigable>
  );
};

ImageList.defaultProps = {
  onEditAsset: undefined,
  selectedAsset: [],
  size: 'S',
};
