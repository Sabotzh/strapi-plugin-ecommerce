import { prefixPluginTranslations } from '@strapi/helper-plugin';
import PluginIcon from './components/PluginIcon'
import pluginId from './pluginId'


export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: pluginId,
        defaultMessage: 'Ecommerce',
      },
      Component: async () => {
        const component = await import('./pages/App');

        return component;
      },
      permissions: [],
    });
    app.registerPlugin({
      id: pluginId,
      name,
    });
  },
  async registerTrads({locales}) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(
          `./translations/${locale}.json`
          )
          .then(({default: data}) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
