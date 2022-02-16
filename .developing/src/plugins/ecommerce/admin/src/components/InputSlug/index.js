import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  EndActionWrapper,
  TextValidation,
  FieldActionWrapper,
  LoadingWrapper
} from './endActionStyle';

import Refresh from '@strapi/icons/Refresh';
import Loader from '@strapi/icons/Loader';
import { TextInput } from '@strapi/design-system/TextInput';
import { Typography } from '@strapi/design-system/Typography';
const slugify = require('slugify');


const ImportSlug = ({ name, label, value, onChange, error, relationName, url, id }) => {
  const [regenerateLabel, setRegenerateLabel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const generateUid = useRef();

  generateUid.current = async () => {
    setIsLoading(true);
    const res = await axios({
      method: 'post',
      url: 'http://localhost:1337/api/ecommerce/' + url,
      data: { id, slug: slugify(relationName) }
    })
    onChange(res.data.slug)
    setIsLoading(false);
  };

  const handleGenerateMouseEnter = () => {
    setRegenerateLabel('Regenerate');
  };

  const handleGenerateMouseLeave = () => {
    setRegenerateLabel(null);
  };
  return (
    <TextInput
      name={ name }
      label={ label }
      value={ value }
      onChange={ e => onChange(e.target.value) }
      error={ error }
      endAction={
        <EndActionWrapper>
          {regenerateLabel && (
            <TextValidation alignItems="center" justifyContent="flex-end">
              <Typography textColor="primary600" variant="pi">
                {regenerateLabel}
              </Typography>
            </TextValidation>
          )}
          <FieldActionWrapper
            onClick={() => generateUid.current()}
            label="regenerate"
            onMouseEnter={handleGenerateMouseEnter}
            onMouseLeave={handleGenerateMouseLeave}
          >
            {isLoading ? (
              <LoadingWrapper>
                <Loader />
              </LoadingWrapper>
            ) : (
              <Refresh />
            )}
          </FieldActionWrapper>
        </EndActionWrapper>
      }
    />
  )
}

export default ImportSlug