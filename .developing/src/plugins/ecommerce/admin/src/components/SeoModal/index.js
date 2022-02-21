import React from 'react';
import Translation from "../Translation";

import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Box } from '@strapi/design-system/Box';
import { Textarea } from '@strapi/design-system/Textarea';
import { TextInput } from '@strapi/design-system/TextInput';

const SeoModal = ({ metaTitle, setMetaTitle, metaKeywords, setMetaKeywords, metaDescription, setMetaDescription, errors }) => {
  return (
    <>
      <Box paddingTop={9} paddingBottom={3}><Typography variant={'beta'}>SEO</Typography></Box>
      <Divider/>
      <Box paddingTop={5}>
        <Grid gap={5}>
          <GridItem col={6}>
            <TextInput
              label={ <Translation id={'modal.input.label.metaTitle'} defaultMessage={'Meta Title'}/> }
              name="metaTitle"
              value={ metaTitle }
              onChange={ e => setMetaTitle(e.target.value) }
              error={ errors.metaTitle }
            />
          </GridItem>
          <GridItem col={6}>
            <TextInput
              label={ <Translation id={'modal.input.label.metaKeywords'} defaultMessage={'Meta Keywords'}/> }
              name="metaKeywords"
              value={ metaKeywords }
              onChange={ e => setMetaKeywords(e.target.value) }
              error={ errors.metaKeywords }
            />
          </GridItem>
          <GridItem col={12}>
            <Textarea
              error={ errors.metaDescription }
              label={ <Translation id={'modal.input.label.metaDescription'} defaultMessage={'Meta Description'}/> }
              name="metaDescription"
              onChange={ e => setMetaDescription(e.target.value) }
            >
              { metaDescription }
            </Textarea>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

export default SeoModal