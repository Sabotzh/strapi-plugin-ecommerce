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
};
